import { initNav } from "./nav.js";
import { initAccordion } from "./accordion.js";
import { initTestimonials } from "./testimonials.js";
import { initServicesTabs } from "./services.js";
import { initBooking } from "./booking.js";

document.addEventListener("includesLoaded", () => {
  initNav();
  initAccordion();
  initTestimonials();
  initServicesTabs();
  initBooking();
});
