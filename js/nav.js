// js/nav.js
export function initNav() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  // nav.style.transition = ...;
  // nav.style.transform = ...;

  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    if (currentY > lastY && currentY > nav.offsetHeight) {
      nav.style.transform = `translateY(-${nav.offsetHeight}px)`;
    } else {
      nav.style.transform = "translateY(0)";
    }
    lastY = currentY;
  });

  // — mobile menu toggle (unchanged) —
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const closer = document.querySelector(".navbar-close");
  const backdrop = document.querySelector(".navbar-backdrop");

  function toggleMenu() {
    console.log("🛰 toggleMenu()");
    if (menu) menu.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
  }

  burger?.addEventListener("click", toggleMenu);
  closer?.addEventListener("click", toggleMenu);
  backdrop?.addEventListener("click", toggleMenu);
}
