// js/includes.js
async function includePartials() {
  const placeholders = Array.from(document.querySelectorAll("[data-include]"));
  await Promise.all(
    placeholders.map(async (el) => {
      const url = el.getAttribute("data-include");
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText);
        const html = await res.text();
        // replace the placeholder with the fetched fragment
        const frag = document.createRange().createContextualFragment(html);
        el.replaceWith(frag);
      } catch (err) {
        console.error(`Failed to include ${url}:`, err);
      }
    })
  );
  // signal that the DOM now contains all your partials
  document.dispatchEvent(new Event("includesLoaded"));
}

document.addEventListener("DOMContentLoaded", includePartials);
