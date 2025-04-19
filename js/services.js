// js/services.js
const serviceData = {
  "deep-cleaning": {
    title: "Deep Cleaning",
    text: "Our Deep Cleaning service goes far beyond the surface—dusting, scrubbing, sanitizing every nook and cranny for a truly spotless home.",
  },
  "standard-cleaning": {
    title: "Standard Cleaning",
    text: "Perfect for busy households: we’ll dust, vacuum, mop, and tidy up common areas to keep your place fresh and welcoming.",
  },
  "move-cleaning": {
    title: "Move‑in / Move‑out Cleaning",
    text: "Whether you’re coming or going, we’ll handle a top‑to‑bottom deep clean so your old or new space is flawless.",
  },
  "carpets-cleaning": {
    title: "Carpets & Upholstery",
    text: "Our gentle but powerful carpet and upholstery cleaning lifts stains, removes odors, and restores fibers to like‑new condition.",
  },
  "extreme-cleaning": {
    title: "Extreme Cleaning",
    text: "Overwhelmed by clutter or neglect? Our Extreme Cleaning tackles the toughest, dirtiest jobs so you don’t have to.",
  },
  "eco-friendly": {
    title: "Eco‑Friendly Cleaning",
    text: "We use only plant‑based, non‑toxic products that are safe for your family, pets, and the planet.",
  },
  "post-construction": {
    title: "Post‑construction Cleaning",
    text: "Dust, debris, paint splatters—our post‑construction team will prep your newly built or renovated space for move‑in.",
  },
  "hire-hour": {
    title: "Hire‑by‑Hour",
    text: "Need just an hour (or two)? Book our pros by the hour and tackle whatever you need—bathrooms, kitchens, you name it.",
  },
  commercial: {
    title: "Commercial Cleaning",
    text: "From offices to retail, keep your workspace healthy and inviting with our customizable commercial cleaning plans.",
  },
  "airbnb-cleaning": {
    title: "AirBnB & Short‑Term Rentals",
    text: "Quick turnovers, spotless beds, refreshed linens—impress every guest with a sparkling, guest‑ready property.",
  },
};

export function initServicesTabs() {
  const buttons = document.querySelectorAll(".service-btn");
  const titleEl = document.querySelector(
    "#service-description .service-description__title"
  );
  const textEl = document.querySelector(
    "#service-description .service-description__text"
  );
  if (!buttons.length || !titleEl || !textEl) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // toggle active state
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // lookup and render
      const key = btn.dataset.service;
      if (serviceData[key]) {
        titleEl.textContent = serviceData[key].title;
        textEl.innerHTML = serviceData[key].text;
      } else {
        // fallback if you ever miss one
        titleEl.textContent = "Service not found";
        textEl.textContent = "";
      }
    });
  });
}
