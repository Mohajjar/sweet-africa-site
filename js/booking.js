// js/booking.js
export function initBooking() {
  const addBtn = document.querySelector(".add-address-btn");
  const addrForm = document.getElementById("address-form");
  const form = document.querySelector("#booking form");

  if (!addBtn || !addrForm || !form) return;

  // Toggle the manual address fields
  addBtn.addEventListener("click", () => {
    addrForm.classList.toggle("d-none");
  });

  // On form submit, validate the address
  form.addEventListener("submit", (e) => {
    // If the address section is visible, check its value
    if (!addrForm.classList.contains("d-none")) {
      const addr = document.getElementById("addressLine").value.trim();
      // Simple check: must contain "CA" or "California"
      if (!/(California|,\s*CA\b)/i.test(addr)) {
        e.preventDefault();
        alert(
          "Sorry, we currently only serve California addresses. Please enter a CA address."
        );
        return;
      }
    }
    // otherwise let the form submit (or advance to next step)
  });
}
