// js/faq.js
export function initFAQ() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    btn.addEventListener("click", () => {
      // 1) Close every other item
      items.forEach((other) => {
        if (other !== item) {
          other.querySelector(".faq-answer").classList.add("hidden");
          other.querySelector(".faq-question").classList.remove("open");
        }
      });

      // 2) Toggle this one
      const isOpen = !answer.classList.contains("hidden");
      if (isOpen) {
        answer.classList.add("hidden");
        btn.classList.remove("open");
      } else {
        answer.classList.remove("hidden");
        btn.classList.add("open");
      }
    });
  });
}
