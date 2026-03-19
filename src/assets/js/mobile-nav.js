document.addEventListener("DOMContentLoaded", () => {
  const mobileNavs = document.querySelectorAll("[data-mobile-nav]");
  if (!mobileNavs.length) return;

  const closeMenu = (menu) => {
    menu.removeAttribute("open");
  };

  mobileNavs.forEach((menu) => {
    const summary = menu.querySelector("summary");
    if (!summary) return;

    const syncExpanded = () => {
      summary.setAttribute("aria-expanded", menu.hasAttribute("open") ? "true" : "false");
    };

    syncExpanded();
    menu.addEventListener("toggle", syncExpanded);

    document.addEventListener("click", (event) => {
      if (!menu.hasAttribute("open")) return;
      if (menu.contains(event.target)) return;
      closeMenu(menu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (!menu.hasAttribute("open")) return;
      closeMenu(menu);
      summary.focus();
    });
  });
});
