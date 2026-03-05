function getToggledPathname(pathname) {
  const normalized = pathname || "/";
  const isNorwegian = normalized === "/no" || normalized.startsWith("/no/");

  if (isNorwegian) {
    const stripped = normalized.replace(/^\/no(?=\/|$)/, "");
    return stripped || "/";
  }

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
