function getToggledPathname(pathname) {
  const normalized = pathname || "/";
  const isNorwegian = normalized === "/no" || normalized.startsWith("/no/");
  const normalizedNoSlash = normalized.replace(/\/+$/, "") || "/";

  const routeMapToNo = {
    "/about": "/no/om/",
    "/gallery": "/no/galleri/",
    "/events": "/no/arrangementer/",
    "/blog": "/no/blogg/",
    "/contact": "/no/kontakt/",
  };
  const routeMapToEn = {
    "/no/om": "/about/",
    "/no/galleri": "/gallery/",
    "/no/arrangementer": "/events/",
    "/no/blogg": "/blog/",
    "/no/kontakt": "/contact/",
  };

  if (isNorwegian) {
    if (routeMapToEn[normalizedNoSlash]) return routeMapToEn[normalizedNoSlash];
    const stripped = normalized.replace(/^\/no(?=\/|$)/, "");
    return stripped || "/";
  }

  if (routeMapToNo[normalizedNoSlash]) return routeMapToNo[normalizedNoSlash];

  if (normalized === "/") {
    return "/no/";
  }

  return `/no${normalized}`;
}

function setupLanguageToggle() {
  const toggles = document.querySelectorAll("[data-lang-toggle]");
  if (!toggles.length) return;

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const { pathname, search, hash } = window.location;
      const targetPath = getToggledPathname(pathname);
      window.location.assign(`${targetPath}${search}${hash}`);
    });
  });
}

document.addEventListener("DOMContentLoaded", setupLanguageToggle);
