// accordion.js
export function initAccordion() {
  const items = document.querySelectorAll("#why-choose-us details");
  items.forEach((details) => {
    const content = details.querySelector(".why-content");
    content.style.maxHeight = details.open
      ? content.scrollHeight + "px"
      : "0px";

    details.addEventListener("toggle", () => {
      if (details.open) {
        // close siblings
        items.forEach((d) => {
          if (d !== details) d.open = false;
        });
        // expand
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        // collapse
        content.style.maxHeight = "0px";
      }
    });
  });
}
