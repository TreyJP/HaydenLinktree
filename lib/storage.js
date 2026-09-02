const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.join(__dirname, "..", "data", "config.json");
const BLOB_PATHNAME = "site-config.json";

let blobModule = null;

async function getBlobModule() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  if (!blobModule) {
    blobModule = await import("@vercel/blob");
  }
  return blobModule;
}

function readLocalConfig() {
  const raw = fs.readFileSync(CONFIG_PATH, "utf8");
  return JSON.parse(raw);
}

function writeLocalConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf8");
}

async function readBlobConfig() {
  const blob = await getBlobModule();
  if (!blob) return null;

  try {
    const { blobs } = await blob.list({ prefix: BLOB_PATHNAME, limit: 1 });
    const match = blobs.find((item) => item.pathname === BLOB_PATHNAME);
    if (!match) return null;

    const response = await fetch(match.url);
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function writeBlobConfig(config) {
  const blob = await getBlobModule();
  if (!blob) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not set. Add Vercel Blob storage for production saves."
    );
  }

  await blob.put(BLOB_PATHNAME, JSON.stringify(config, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

async function getConfig() {
  const blobConfig = await readBlobConfig();
  if (blobConfig) return blobConfig;
  return readLocalConfig();
}

async function saveConfig(config) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeBlobConfig(config);
  } else if (process.env.VERCEL) {
    throw new Error(
      "Add BLOB_READ_WRITE_TOKEN in Vercel to save changes in production."
    );
  } else {
    writeLocalConfig(config);
  }
}

function stripIds(config) {
  return {
    ...config,
    sections: config.sections.map(({ id, ...section }) => ({
      ...section,
      links: section.links.map(({ id: linkId, ...link }) => link),
    })),
  };
}

module.exports = {
  getConfig,
  saveConfig,
  stripIds,
};
