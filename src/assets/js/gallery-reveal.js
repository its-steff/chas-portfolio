function setupGalleryReveal() {
  const buttons = document.querySelectorAll("[data-reveal-button]");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    const group = button.getAttribute("data-reveal-button");
    const step = Number.parseInt(button.getAttribute("data-reveal-step") || "3", 10);

    if (!group) return;

    const getHiddenItems = () =>
      Array.from(document.querySelectorAll(`[data-reveal-item="${group}"]`)).filter((item) =>
        item.classList.contains("is-hidden")
      );

    const syncButtonVisibility = () => {
      const hiddenItems = getHiddenItems();
      button.hidden = hiddenItems.length === 0;
    };

    button.addEventListener("click", () => {
      const hiddenItems = getHiddenItems();
      hiddenItems.slice(0, step).forEach((item) => item.classList.remove("is-hidden"));
      syncButtonVisibility();
    });

    syncButtonVisibility();
  });
}

document.addEventListener("DOMContentLoaded", setupGalleryReveal);
