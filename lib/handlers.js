const {
  verifyPassword,
  signToken,
  isAuthenticated,
  setAuthCookie,
  clearAuthCookie,
} = require("./auth");
const { getConfig, saveConfig, stripIds } = require("./storage");

const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const record = loginAttempts.get(ip);
  if (!record) return false;
  if (record.lockedUntil && Date.now() < record.lockedUntil) return true;
  if (record.lockedUntil && Date.now() >= record.lockedUntil) {
    loginAttempts.delete(ip);
    return false;
  }
  return false;
}

function recordFailedLogin(ip) {
  const record = loginAttempts.get(ip) || { count: 0 };
  record.count += 1;
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCKOUT_MS;
    record.count = 0;
  }
  loginAttempts.set(ip, record);
}

function clearLoginAttempts(ip) {
  loginAttempts.delete(ip);
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;

  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function validateConfig(config) {
  if (!config || typeof config !== "object") {
    throw new Error("Invalid config");
  }
  if (!config.name || !config.bio) {
    throw new Error("Name and bio are required");
  }
  if (!Array.isArray(config.sections)) {
    throw new Error("Sections must be an array");
  }

  for (const section of config.sections) {
    if (!section.title?.trim()) throw new Error("Every section needs a title");
    if (!Array.isArray(section.links)) {
      throw new Error("Section links must be an array");
    }
    for (const link of section.links) {
      if (!link.title?.trim()) throw new Error("Every link needs a title");
      if (link.email) continue;
      if (!link.url?.trim()) throw new Error("Links need a URL or email");
    }
  }
}

async function handleConfigGet(req, res) {
  try {
    const config = await getConfig();
    sendJson(res, 200, stripIds(config));
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

async function handleAdminConfigGet(req, res) {
  if (!isAuthenticated(req)) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  try {
    const config = await getConfig();
    sendJson(res, 200, config);
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

async function handleConfigPut(req, res) {
  if (!isAuthenticated(req)) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  try {
    const body = await readBody(req);
    validateConfig(body);
    await saveConfig(body);
    sendJson(res, 200, { ok: true });
  } catch (error) {
    sendJson(res, 400, { error: error.message });
  }
}

async function handleLogin(req, res) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return sendJson(res, 429, {
      error: "Too many attempts. Try again in 15 minutes.",
    });
  }

  try {
    const { username, password } = await readBody(req);
    const expectedUser = process.env.ADMIN_USERNAME || "admin";

    if (username !== expectedUser) {
      recordFailedLogin(ip);
      return sendJson(res, 401, { error: "Invalid credentials" });
    }

    const valid = await verifyPassword(password);
    if (!valid) {
      recordFailedLogin(ip);
      return sendJson(res, 401, { error: "Invalid credentials" });
    }

    clearLoginAttempts(ip);
    const token = signToken(username);
    setAuthCookie(res, token);
    sendJson(res, 200, { ok: true, username });
  } catch (error) {
    sendJson(res, 400, { error: error.message });
  }
}

async function handleLogout(req, res) {
  clearAuthCookie(res);
  sendJson(res, 200, { ok: true });
}

async function handleMe(req, res) {
  if (!isAuthenticated(req)) {
    return sendJson(res, 401, { authenticated: false });
  }
  sendJson(res, 200, { authenticated: true });
}

module.exports = {
  handleConfigGet,
  handleAdminConfigGet,
  handleConfigPut,
  handleLogin,
  handleLogout,
  handleMe,
};
