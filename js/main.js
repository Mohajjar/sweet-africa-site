import { initNav } from "./nav.js";
import { initAccordion } from "./accordion.js";
import { initTestimonials } from "./testimonials.js";
import { initServicesTabs } from "./services.js";
import { initFAQ } from "./faq.js";

document.addEventListener("includesLoaded", () => {
  // 1) Initialize all UI bits
  initNav();
  initAccordion();
  initTestimonials();
  initServicesTabs();
  initFAQ();

  // intercept same‐page hash links (already there)
  document.querySelectorAll('a[href^="/#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const path = window.location.pathname.replace(/\/index\.html$/, "/");
      if (path === "/") {
        e.preventDefault();
        const target = document.querySelector(link.hash);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // **NEW**: if we landed here with a hash in the URL, scroll to it now that the DOM is ready
  if (window.location.hash) {
    const el = document.querySelector(window.location.hash);
    if (el) {
      // small timeout to ensure CSS scroll-padding-top is applied
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }
});
