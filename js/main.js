import { initNav } from "./nav.js";
import { initAccordion } from "./accordion.js";
import { initTestimonials } from "./testimonials.js";
import { initServicesTabs } from "./services.js";
document.addEventListener("includesLoaded", () => {
  console.log("icnludesLoaded");
  initNav();
  initAccordion();
  initTestimonials();
  initServicesTabs();
});
