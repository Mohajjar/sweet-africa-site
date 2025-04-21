// js/includes.js
async function includePartials() {
  const placeholders = Array.from(document.querySelectorAll("[data-include]"));
  await Promise.all(
    placeholders.map(async (el) => {
      // 1. read the fragment name
      const url = el.getAttribute("data-include");
      // 2. build a root-relative path
      const path = url.startsWith("/") ? url : `/${url}`;
      try {
        // 3. fetch that path
        const res = await fetch(path);
        if (!res.ok) throw new Error(res.statusText);
        const html = await res.text();
        // replace the placeholder
        const frag = document.createRange().createContextualFragment(html);
        el.replaceWith(frag);
      } catch (err) {
        console.error(`Failed to include ${path}:`, err);
      }
    })
  );
  // now that everything’s in, fire the event
  document.dispatchEvent(new Event("includesLoaded"));
}

document.addEventListener("DOMContentLoaded", includePartials);
