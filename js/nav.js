// js/nav.js
export function initNav() {
  const nav = document.getElementById("mainNav");
  console.log("🛰 initNav() called. nav:", nav);
  if (!nav) return;

  // force a transition so we know it’s applied
  nav.style.transition = "transform 0.3s ease-in-out";
  nav.style.transform = "translateY(0)";

  let lastY = window.scrollY;
  console.log("🛰 initNav: starting lastY =", lastY);

  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    console.log("🛰 scroll event, currentY =", currentY);
    if (currentY > lastY && currentY > nav.offsetHeight) {
      console.log("🛰 hiding nav");
      nav.style.transform = `translateY(-${nav.offsetHeight}px)`;
    } else {
      console.log("🛰 showing nav");
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
