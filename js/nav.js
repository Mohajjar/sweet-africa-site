// js/nav.js
export function initNav() {
  // —— Mobile menu toggle ——
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const closer = document.querySelector(".navbar-close");
  const backdrop = document.querySelector(".navbar-backdrop");
  function toggleMenu() {
    if (menu) menu.classList.toggle("hidden");
  }
  if (burger) burger.addEventListener("click", toggleMenu);
  if (closer) closer.addEventListener("click", toggleMenu);
  if (backdrop) backdrop.addEventListener("click", toggleMenu);

  // —— Auto‑hide/Show Navbar on Scroll ——
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  // **NEW**: push the page down by exactly the nav's height
  const navHeight = nav.offsetHeight;
  document.body.style.paddingTop = `${navHeight}px`;
  // and make anchor‑scrolls aware of the nav
  document.documentElement.style.scrollPaddingTop = `${navHeight}px`;

  let lastY = window.pageYOffset;
  window.addEventListener("scroll", () => {
    const currentY = window.pageYOffset;
    if (currentY > lastY && currentY > 50) {
      nav.classList.add("-translate-y-full");
    } else {
      nav.classList.remove("-translate-y-full");
    }
    lastY = currentY;
  });
}
