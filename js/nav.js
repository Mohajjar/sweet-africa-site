// js/nav.js
export function initNav() {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const closer = document.querySelector(".navbar-close");
  const backdrop = document.querySelector(".navbar-backdrop");

  function toggleMenu() {
    if (!menu) return;
    menu.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
  }

  burger && burger.addEventListener("click", toggleMenu);
  closer && closer.addEventListener("click", toggleMenu);
  backdrop && backdrop.addEventListener("click", toggleMenu);

  // **NEW**: close menu when you click any link inside it
  if (menu) {
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        // let the navigation happen...
        toggleMenu();
      });
    });
  }

  // auto‑hide on scroll (unchanged)
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  let lastY = window.pageYOffset;
  window.addEventListener("scroll", () => {
    const currentY = window.pageYOffset;
    nav.classList.toggle(
      "-translate-y-full",
      currentY > lastY && currentY > 50
    );
    lastY = currentY;
  });
}
