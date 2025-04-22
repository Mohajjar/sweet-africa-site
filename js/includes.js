// js/includes.js
document.addEventListener("DOMContentLoaded", async () => {
  const placeholders = document.querySelectorAll("[data-include]");
  for (const el of placeholders) {
    const file = el.getAttribute("data-include");
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const html = await res.text();
      el.innerHTML = html;
      el.removeAttribute("data-include");
    } catch (err) {
      console.error(`🧩 include failed for ${file}:`, err);
    }
  }
  // if you need to hook into “all includes are in place”:
  document.dispatchEvent(new Event("includesLoaded"));
});
