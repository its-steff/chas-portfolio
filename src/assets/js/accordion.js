document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll("[data-accordion='single']");
  if (!accordions.length) return;

  const closeItem = (item) => {
    item.classList.remove("is-open");
    const panel = item.querySelector(".faq-panel");
    const trigger = item.querySelector(".faq-trigger");
    if (panel) {
      panel.style.maxHeight = "";
      panel.setAttribute("aria-hidden", "true");
    }
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  };

  const openItem = (item) => {
    item.classList.add("is-open");
    const panel = item.querySelector(".faq-panel");
    const inner = item.querySelector(".faq-panel__inner");
    const trigger = item.querySelector(".faq-trigger");
    if (panel && inner) {
      panel.style.maxHeight = `${inner.scrollHeight}px`;
      panel.setAttribute("aria-hidden", "false");
    }
    if (trigger) trigger.setAttribute("aria-expanded", "true");
  };

  accordions.forEach((accordion) => {
    const triggers = accordion.querySelectorAll(".faq-trigger");

    accordion.addEventListener("keydown", (event) => {
      const trigger = event.target.closest(".faq-trigger");
      if (!trigger) return;

      const { key } = event;
      if (key !== "ArrowDown" && key !== "ArrowUp" && key !== "Home" && key !== "End") return;

      event.preventDefault();
      const triggerList = Array.from(triggers);
      const index = triggerList.indexOf(trigger);
      if (index === -1) return;

      let nextIndex = index;
      if (key === "ArrowDown") nextIndex = (index + 1) % triggerList.length;
      if (key === "ArrowUp") nextIndex = (index - 1 + triggerList.length) % triggerList.length;
      if (key === "Home") nextIndex = 0;
      if (key === "End") nextIndex = triggerList.length - 1;

      triggerList[nextIndex].focus();
    });

    accordion.addEventListener("click", (event) => {
      const trigger = event.target.closest(".faq-trigger");
      if (!trigger) return;

      const item = trigger.closest("[data-accordion-item]");
      if (!item) return;

      const items = accordion.querySelectorAll("[data-accordion-item]");
      items.forEach((other) => {
        if (other !== item) closeItem(other);
      });

      if (item.classList.contains("is-open")) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });
});
