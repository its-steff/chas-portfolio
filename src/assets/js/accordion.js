document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll("[data-accordion='single']");
  if (!accordions.length) return;

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", (event) => {
      const summary = event.target.closest("summary");
      if (!summary) return;

      const details = summary.parentElement;
      if (!details || !details.hasAttribute("data-accordion-item")) return;

      const items = accordion.querySelectorAll("details[data-accordion-item]");
      items.forEach((item) => {
        if (item !== details) item.removeAttribute("open");
      });
    });
  });
});
