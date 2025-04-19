// js/booking.js
export function initBooking() {
  const addBtn = document.querySelector(".add-address-btn");
  const addrForm = document.getElementById("address-form");
  if (!addBtn || !addrForm) return;

  addBtn.addEventListener("click", () => {
    addrForm.classList.toggle("d-none");

    // when showing, try geolocating and reject if outside CA
    if (!addrForm.classList.contains("d-none") && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          // Rough CA bounds
          const inCA =
            latitude >= 32.5 &&
            latitude <= 42.0 &&
            longitude >= -124.5 &&
            longitude <= -114.0;

          if (!inCA) {
            alert("Sorry, we only serve California addresses.");
            addrForm.classList.add("d-none");
          } else {
            // fill placeholder with coords
            const addrInput = document.getElementById("addressLine");
            addrInput.placeholder = `Your location: ${latitude.toFixed(
              4
            )}, ${longitude.toFixed(4)}`;
          }
        },
        (err) => {
          console.warn("Geolocation failed:", err);
          // silently continue—user can type manually
        }
      );
    }
  });
}
