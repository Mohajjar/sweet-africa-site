// js/testimonials.js
export function initTestimonials() {
  const carouselEl = document.getElementById("testimonialCarousel");
  if (!carouselEl) return;

  // Disable automatic cycling
  $(carouselEl).carousel({ interval: false });

  // Simple touch‐swipe support
  let startX = 0;
  carouselEl.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    false
  );
  carouselEl.addEventListener(
    "touchend",
    (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          $(carouselEl).carousel("next");
        } else {
          $(carouselEl).carousel("prev");
        }
      }
    },
    false
  );
}
