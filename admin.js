const ICONS = [
  "globe", "discord", "telegram", "instagram", "youtube", "github",
  "shopping", "calendar", "mail", "link", "car", "tiktok",
];

const SOCIAL_PLATFORMS = [
  "instagram", "tiktok", "twitter", "youtube", "linkedin", "spotify", "twitch",
];

let config = null;
let dirty = false;
let authed = false;

const $ = (sel) => document.querySelector(sel);
const loginView = $("#login-view");
const dashboard = $("#dashboard");
const sectionsList = $("#sections-list");
const socialsList = $("#socials-list");
const saveStatus = $("#save-status");

function uid() {
  return crypto.randomUUID();
}

function showToast(msg) {
  const toast = $("#toast");
  toast.textContent = msg;
  toast.classList.add("visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("visible"), 2800);
}

function markDirty() {
  dirty = true;
  saveStatus.textContent = "Unsaved changes";
  saveStatus.className = "save-status unsaved";
}

function markSaved() {
  dirty = false;
  saveStatus.textContent = "All changes saved";
  saveStatus.className = "save-status saved";
}

async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && !path.includes("/auth/login")) {
    showLogin();
    throw new Error("Session expired. Please log in again.");
  }
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

async function checkAuth() {
  try {
    const data = await api("/api/auth/me");
    return data.authenticated;
  } catch {
    return false;
  }
}

function showDashboard() {
  authed = true;
  loginView.hidden = true;
  dashboard.hidden = false;
  document.body.classList.add("admin-authed");
  $("#login-form").reset();
  $("#login-error").hidden = true;
}

function showLogin() {
  authed = false;
  config = null;
  loginView.hidden = false;
  dashboard.hidden = true;
  document.body.classList.remove("admin-authed");
  sectionsList.innerHTML = "";
  socialsList.innerHTML = "";
}

function requireAuth() {
  if (!authed) {
    showLogin();
    throw new Error("You must be logged in to edit links");
  }
}

async function loadConfig() {
  requireAuth();
  config = await api("/api/admin/config");
  ensureIds(config);
  renderAll();
  markSaved();
}

function ensureIds(cfg) {
  cfg.sections.forEach((sec) => {
    if (!sec.id) sec.id = uid();
    sec.links.forEach((link) => {
      if (!link.id) link.id = uid();
    });
  });
}

function syncProfileFromForm() {
  config.name = $("#profile-name").value.trim();
  config.bio = $("#profile-bio").value.trim();
  config.avatar = $("#profile-avatar").value.trim();
  config.contactInstagram = $("#contact-instagram").value.trim();
}

function renderAll() {
  $("#profile-name").value = config.name || "";
  $("#profile-bio").value = config.bio || "";
  $("#profile-avatar").value = config.avatar || "";
  $("#contact-instagram").value = config.contactInstagram || "";
  renderSections();
  renderSocials();
}

function renderSections() {
  sectionsList.innerHTML = config.sections
    .map((section, si) => `
      <div class="section-card" data-section-id="${section.id}">
        <div class="section-header">
          <span class="drag-handle section-drag" title="Drag to reorder">⠿</span>
          <input type="text" value="${esc(section.title)}" data-field="section-title" data-section="${section.id}" placeholder="Section name" />
          <button type="button" class="btn btn-danger" data-action="delete-section" data-section="${section.id}">Delete</button>
        </div>
        <div class="section-links" data-section-links="${section.id}">
          ${section.links.map((link) => renderLinkCard(link, section.id)).join("")}
        </div>
        <div class="section-footer">
          <button type="button" class="btn btn-small" data-action="add-link" data-section="${section.id}">+ Add Link</button>
        </div>
      </div>
    `)
    .join("");

  initSortables();
}

function renderLinkCard(link, sectionId) {
  const isEmail = Boolean(link.email);
  return `
    <div class="link-card" data-link-id="${link.id}" data-section="${sectionId}">
      <div class="link-card-head">
        <span class="drag-handle link-drag" title="Drag to reorder">⠿</span>
        <span>Link</span>
        <button type="button" class="btn btn-danger" data-action="delete-link" data-link="${link.id}" data-section="${sectionId}">✕</button>
      </div>
      <div class="link-type-toggle">
        <button type="button" class="${isEmail ? "" : "active"}" data-action="set-type" data-type="url" data-link="${link.id}" data-section="${sectionId}">URL Link</button>
        <button type="button" class="${isEmail ? "active" : ""}" data-action="set-type" data-type="email" data-link="${link.id}" data-section="${sectionId}">Email (copy)</button>
      </div>
      <div class="link-fields">
        <label class="full">
          Title
          <input type="text" value="${esc(link.title)}" data-field="link-title" data-link="${link.id}" data-section="${sectionId}" />
        </label>
        ${isEmail ? `
          <label class="full">
            Email address
            <input type="email" value="${esc(link.email || "")}" data-field="link-email" data-link="${link.id}" data-section="${sectionId}" />
          </label>
        ` : `
          <label class="full">
            URL
            <input type="url" value="${esc(link.url || "")}" data-field="link-url" data-link="${link.id}" data-section="${sectionId}" placeholder="https://" />
          </label>
        `}
        <label>
          Icon
          <select data-field="link-icon" data-link="${link.id}" data-section="${sectionId}">
            ${ICONS.map((i) => `<option value="${i}" ${link.icon === i ? "selected" : ""}>${i}</option>`).join("")}
          </select>
        </label>
        <label>
          Hover popup
          <input type="text" value="${esc(link.hoverPopup || "")}" data-field="link-popup" data-link="${link.id}" data-section="${sectionId}" placeholder="Optional" />
        </label>
      </div>
      <div class="link-options">
        <label><input type="checkbox" data-field="link-new" data-link="${link.id}" data-section="${sectionId}" ${link.isNew ? "checked" : ""} /> Show "New" badge</label>
      </div>
    </div>
  `;
}

function renderSocials() {
  socialsList.innerHTML = (config.socials || [])
    .map((social, i) => `
      <div class="social-row" data-social-index="${i}">
        <label>
          Platform
          <select data-field="social-platform" data-index="${i}">
            ${SOCIAL_PLATFORMS.map((p) => `<option value="${p}" ${social.platform === p ? "selected" : ""}>${p}</option>`).join("")}
          </select>
        </label>
        <label>
          URL
          <input type="url" value="${esc(social.url)}" data-field="social-url" data-index="${i}" />
        </label>
        <button type="button" class="btn btn-danger" data-action="delete-social" data-index="${i}">✕</button>
      </div>
    `)
    .join("");
}

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function getSection(id) {
  return config.sections.find((s) => s.id === id);
}

function getLink(sectionId, linkId) {
  return getSection(sectionId)?.links.find((l) => l.id === linkId);
}

function initSortables() {
  Sortable.create(sectionsList, {
    handle: ".section-drag",
    animation: 180,
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    onEnd(evt) {
      const moved = config.sections.splice(evt.oldIndex, 1)[0];
      config.sections.splice(evt.newIndex, 0, moved);
      markDirty();
    },
  });

  document.querySelectorAll("[data-section-links]").forEach((el) => {
    Sortable.create(el, {
      handle: ".link-drag",
      group: "links",
      animation: 180,
      ghostClass: "sortable-ghost",
      onEnd(evt) {
        const fromSectionId = evt.from.dataset.sectionLinks;
        const toSectionId = evt.to.dataset.sectionLinks;
        const fromSection = getSection(fromSectionId);
        const toSection = getSection(toSectionId);
        const moved = fromSection.links.splice(evt.oldIndex, 1)[0];
        toSection.links.splice(evt.newIndex, 0, moved);
        markDirty();
      },
    });
  });
}

function bindEvents() {
  $("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const errEl = $("#login-error");
    errEl.hidden = true;
    try {
      await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: $("#login-username").value.trim(),
          password: $("#login-password").value,
        }),
      });
      showDashboard();
      await loadConfig();
    } catch (err) {
      errEl.textContent = err.message;
      errEl.hidden = false;
    }
  });

  $("#logout-btn").addEventListener("click", async () => {
    await api("/api/auth/logout", { method: "POST" });
    showLogin();
  });

  $("#save-btn").addEventListener("click", () => {
    try {
      requireAuth();
      saveConfig();
    } catch (err) {
      showToast(err.message);
    }
  });

  ["profile-name", "profile-bio", "profile-avatar", "contact-instagram"].forEach((id) => {
    $(`#${id}`).addEventListener("input", () => {
      if (!authed) return;
      syncProfileFromForm();
      markDirty();
    });
  });

  $("#add-section-btn").addEventListener("click", () => {
    if (!authed) return showToast("Log in to edit links");
    config.sections.push({ id: uid(), title: "New Section", links: [] });
    renderSections();
    markDirty();
  });

  $("#add-social-btn").addEventListener("click", () => {
    if (!authed) return showToast("Log in to edit links");
    if (!config.socials) config.socials = [];
    config.socials.push({ platform: "instagram", url: "" });
    renderSocials();
    markDirty();
  });

  dashboard.addEventListener("input", (e) => {
    if (!authed) return;
    const t = e.target;
    const field = t.dataset.field;
    if (!field) return;

    if (field === "section-title") {
      getSection(t.dataset.section).title = t.value;
    } else if (field === "link-title") {
      getLink(t.dataset.section, t.dataset.link).title = t.value;
    } else if (field === "link-url") {
      const link = getLink(t.dataset.section, t.dataset.link);
      link.url = t.value;
      delete link.email;
    } else if (field === "link-email") {
      const link = getLink(t.dataset.section, t.dataset.link);
      link.email = t.value;
      delete link.url;
    } else if (field === "link-icon") {
      getLink(t.dataset.section, t.dataset.link).icon = t.value;
    } else if (field === "link-popup") {
      const link = getLink(t.dataset.section, t.dataset.link);
      const val = t.value.trim();
      if (val) link.hoverPopup = val;
      else delete link.hoverPopup;
    } else if (field === "social-platform") {
      config.socials[t.dataset.index].platform = t.value;
    } else if (field === "social-url") {
      config.socials[t.dataset.index].url = t.value;
    }
    markDirty();
  });

  dashboard.addEventListener("change", (e) => {
    if (!authed) return;
    const t = e.target;
    if (t.dataset.field === "link-new") {
      const link = getLink(t.dataset.section, t.dataset.link);
      if (t.checked) link.isNew = true;
      else delete link.isNew;
      markDirty();
    }
  });

  dashboard.addEventListener("click", (e) => {
    if (!authed) return;
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;

    if (action === "delete-section") {
      if (!confirm("Delete this section and all its links?")) return;
      config.sections = config.sections.filter((s) => s.id !== btn.dataset.section);
      renderSections();
      markDirty();
    }

    if (action === "delete-link") {
      const section = getSection(btn.dataset.section);
      section.links = section.links.filter((l) => l.id !== btn.dataset.link);
      renderSections();
      markDirty();
    }

    if (action === "add-link") {
      getSection(btn.dataset.section).links.push({
        id: uid(),
        title: "New Link",
        url: "https://",
        icon: "link",
      });
      renderSections();
      markDirty();
    }

    if (action === "set-type") {
      const link = getLink(btn.dataset.section, btn.dataset.link);
      if (btn.dataset.type === "email") {
        link.email = "";
        delete link.url;
      } else {
        link.url = "https://";
        delete link.email;
      }
      renderSections();
      markDirty();
    }

    if (action === "delete-social") {
      config.socials.splice(Number(btn.dataset.index), 1);
      renderSocials();
      markDirty();
    }
  });

  window.addEventListener("beforeunload", (e) => {
    if (dirty) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
}

async function saveConfig() {
  requireAuth();
  syncProfileFromForm();
  try {
    await api("/api/config", { method: "PUT", body: JSON.stringify(config) });
    markSaved();
    showToast("Saved! Your live site is updated.");
  } catch (err) {
    showToast(err.message);
  }
}

async function init() {
  bindEvents();
  if (await checkAuth()) {
    showDashboard();
    await loadConfig();
  } else {
    showLogin();
  }
}

init();
