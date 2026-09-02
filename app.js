const ICONS = {
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  shopping: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
  car: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.6a2 2 0 0 0-1.6-.8H10.3a2 2 0 0 0-1.6.8L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,
};

const SOCIAL_ICONS = {
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.4.4 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.4-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.4-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2M12 0C8.7 0 8.3 0 7 0 5.7.1 4.8.3 4 .6c-.8.3-1.5.7-2.2 1.4C1.1 2.7.7 3.4.4 4.2.1 5 .0 5.9 0 7.2 0 8.5 0 8.9 0 12s0 3.5.1 4.8c.1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .6 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.2C21.3 1.1 20.6.7 19.8.4 19 .1 18.1 0 16.8 0 15.5 0 15.1 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.9a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.89 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>`,
  spotify: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.4-.76.52-1.16.28-3.18-1.94-7.18-2.38-11.9-1.3-.46.1-.92-.18-1.02-.64-.1-.46.18-.92.64-1.02 5.12-1.18 9.58-.68 13.14 1.48.4.24.52.76.3 1.2zm1.48-3.28c-.3.48-.94.64-1.42.34-3.64-2.24-9.2-2.88-13.52-1.58-.54.16-1.12-.14-1.28-.68-.16-.54.14-1.12.68-1.28 4.92-1.5 11.04-.8 15.24 1.68.48.3.64.94.3 1.42zm.12-3.4C15.24 8.4 8.82 8.16 5.16 9.36c-.66.2-1.36-.18-1.56-.84-.2-.66.18-1.36.84-1.56 4.16-1.26 11.28-.96 15.72 1.82.6.36.8 1.14.44 1.74-.36.6-1.14.8-1.74.44z"/></svg>`,
  twitch: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.64 5.5H9.5V3.5h2.14V5.5zm5.14 0h-2.14V3.5h2.14V5.5zM4 0L1 3v18h6v3l3-3h4.5l6-6V0H4zm19 13.5L17.5 19h-4.5l-3 3v-3H4V2h19v11.5z"/><path d="M15 7.5h2v5H15v-5zm-4 0h2v5h-2v-5z"/></svg>`,
};

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--bg", theme.background);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-hover", theme.accentHover);
  root.style.setProperty("--text", theme.text);
  root.style.setProperty("--text-muted", theme.textMuted);
  root.style.setProperty("--link-bg", theme.linkBg);
  root.style.setProperty("--link-border", theme.linkBorder);
  document.querySelector('meta[name="theme-color"]').content = theme.background;
}

function renderProfile(config) {
  document.getElementById("display-name").textContent = config.name;
  document.getElementById("bio").textContent = config.bio;
  document.getElementById("avatar").src = config.avatar;
  document.getElementById("avatar").alt = `${config.name}'s profile picture`;
  document.title = `${config.name} | Links`;
}

function renderLinkButton(link, delay) {
  if (link.email) {
    return `
    <button
      type="button"
      class="link-btn link-btn-email"
      data-email="${link.email}"
      style="--delay: ${delay}s"
    >
      <span class="link-icon" aria-hidden="true">${ICONS[link.icon] || ICONS.mail}</span>
      <span class="link-title">${link.title}</span>
      <span class="link-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 8h8v8M16 8l-8 8"/></svg>
      </span>
    </button>
  `;
  }

  const newClass = link.isNew ? " link-btn-new" : "";
  const popupClass = link.hoverPopup ? " link-btn-has-popup" : "";
  const newBadge = link.isNew ? `<span class="link-badge">New</span>` : "";
  const popupHtml = link.hoverPopup
    ? `<span class="link-hover-popup" aria-hidden="true"><span class="popup-cash">💵</span>${link.hoverPopup}<span class="popup-cash">💰</span></span>`
    : "";

  return `
    <a
      href="${link.url}"
      class="link-btn${newClass}${popupClass}"
      target="_blank"
      rel="noopener noreferrer"
      style="--delay: ${delay}s"
    >
      ${popupHtml}
      <span class="link-icon" aria-hidden="true">${ICONS[link.icon] || ICONS.link}</span>
      <span class="link-title">${link.title}${newBadge}</span>
      <span class="link-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
      </span>
    </a>
  `;
}

function renderSections(sections) {
  const container = document.getElementById("links");
  let delay = 0;

  container.innerHTML = sections
    .map((section) => {
      const buttons = section.links
        .map((link) => {
          const html = renderLinkButton(link, delay * 0.06);
          delay += 1;
          return html;
        })
        .join("");

      return `
        <section class="link-section" aria-label="${section.title}">
          <h2 class="section-title">${section.title}</h2>
          <div class="section-links">${buttons}</div>
        </section>
      `;
    })
    .join("");
}

const IN_APP_SOCIALS = new Set(["instagram", "tiktok"]);

function normalizeSocialUrl(platform, url) {
  if (platform === "tiktok") {
    const match = url.match(/tiktok\.com\/@([^/?#]+)/i);
    return match ? `https://www.tiktok.com/@${match[1]}?_r=1` : url;
  }

  if (platform === "instagram") {
    const match = url.match(/instagram\.com\/([^/?#]+)/i);
    return match ? `https://www.instagram.com/${match[1]}/` : url;
  }

  return url;
}

function renderSocials(socials) {
  const container = document.getElementById("socials");
  if (!socials.length) {
    container.hidden = true;
    return;
  }
  container.innerHTML = socials
    .map((social) => {
      const useNativeOpen = IN_APP_SOCIALS.has(social.platform);
      const href = normalizeSocialUrl(social.platform, social.url);
      const targetAttrs = useNativeOpen
        ? ""
        : 'target="_blank" rel="noopener noreferrer"';

      return `
    <a
      href="${href}"
      class="social-btn${useNativeOpen ? " social-btn-native" : ""}"
      data-platform="${social.platform}"
      ${targetAttrs}
      aria-label="${social.platform}"
    >
      ${SOCIAL_ICONS[social.platform] || ICONS.link}
    </a>
  `;
    })
    .join("");
}

function setupSocialClicks() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-platform]");
    if (!btn || !IN_APP_SOCIALS.has(btn.dataset.platform)) return;

    e.preventDefault();

    const platform = btn.dataset.platform;
    const inInstagram = /Instagram/i.test(navigator.userAgent);
    const inTikTok = /TikTok|BytedanceWebview|musical_ly/i.test(navigator.userAgent);

    if (
      (platform === "instagram" && inInstagram) ||
      (platform === "tiktok" && inTikTok)
    ) {
      showToast("Tap ⋯ then Open in browser to visit profile");
      return;
    }

    window.location.assign(btn.href);
  });
}

function showToast(message, duration = 2500) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("visible"), duration);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  }
}

async function copyEmail(email) {
  const copied = await copyText(email);
  if (copied) {
    showToast(`Email copied: ${email}`, 3500);
  } else {
    showToast(`Email: ${email}`, 5000);
  }
}

function setupEmailClicks() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-email]");
    if (!btn) return;
    e.preventDefault();
    copyEmail(btn.dataset.email);
  });
}

function renderFooter(config) {
  const contact = document.getElementById("contact-link");
  if (contact && config.contactInstagram) {
    contact.href = normalizeSocialUrl("instagram", config.contactInstagram);
    contact.dataset.platform = "instagram";
  }
}

function setupCopyLink() {
  document.getElementById("copy-btn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied!");
    } catch {
      showToast("Could not copy link");
    }
  });
}

function trackClick(label) {
  /* Hook for analytics — e.g. gtag('event', 'click', { link: label }) */
}

async function init() {
  try {
    const res = await fetch("/api/config");
    if (!res.ok) throw new Error("Failed to load config");
    const CONFIG = await res.json();

    applyTheme(CONFIG.theme);
    renderProfile(CONFIG);
    renderSections(CONFIG.sections);
    renderSocials(CONFIG.socials);
    renderFooter(CONFIG);
    setupSocialClicks();
    setupEmailClicks();
    setupCopyLink();

    document.getElementById("links").addEventListener("click", (e) => {
      const btn = e.target.closest(".link-btn");
      if (btn) trackClick(btn.querySelector(".link-title")?.textContent);
    });
  } catch (err) {
    console.error(err);
    document.getElementById("display-name").textContent = "Unable to load links";
    document.getElementById("bio").textContent = "Please refresh the page.";
  }
}

init();
