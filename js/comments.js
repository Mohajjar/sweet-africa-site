window.addEventListener("DOMContentLoaded", () => {
  const API_BASE = "https://sag-admin-6ec27a108ca4.herokuapp.com";
  const slug = window.location.pathname.split("/").pop().replace(".html", "");

  const waitForComments = setInterval(() => {
    const listEl = document.getElementById("comment-list");
    const form = document.getElementById("comment-form");
    const errorEl = document.getElementById("form-error");

    if (!listEl || !form || !errorEl) return;

    clearInterval(waitForComments); // DOM is ready

    async function loadComments() {
      listEl.innerHTML = '<p class="text-gray-500">Loading comments…</p>';
      try {
        const res = await fetch(`${API_BASE}/api/comments?article=${slug}`);
        const comments = await res.json();

        if (!comments.length) {
          listEl.innerHTML =
            '<p class="text-gray-500">No comments yet. Be the first!</p>';
          return;
        }

        listEl.innerHTML = "";
        comments.forEach((c) => {
          const card = document.createElement("div");
          card.className = "bg-white p-6 rounded-xl shadow-sm";
          card.innerHTML = `
              <div class="flex justify-between">
                <p class="font-medium">${c.firstName} ${c.lastName}</p>
                <span class="text-sm text-gray-500">${new Date(
                  c.timestamp
                ).toLocaleString()}</span>
              </div>
              <p class="mt-3 text-gray-800">${c.comment}</p>
            `;
          listEl.append(card);
        });
      } catch (err) {
        listEl.innerHTML =
          '<p class="text-red-500">Failed to load comments.</p>';
      }
    }

    loadComments();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorEl.classList.add("hidden");

      const data = {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        comment: form.comment.value.trim(),
        article: slug,
      };

      if (data.comment.length < 5) {
        errorEl.textContent = "Comment must be at least 5 characters.";
        return errorEl.classList.remove("hidden");
      }

      try {
        const res = await fetch(`${API_BASE}/api/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error();

        const newC = await res.json();
        const card = document.createElement("div");
        card.className = "bg-white p-6 rounded-xl shadow-sm";
        card.innerHTML = `
            <div class="flex justify-between">
              <p class="font-medium">${newC.firstName} ${newC.lastName}</p>
              <span class="text-sm text-gray-500">${new Date(
                newC.timestamp
              ).toLocaleString()}</span>
            </div>
            <p class="mt-3 text-gray-800">${newC.comment}</p>
          `;
        listEl.prepend(card);
        form.reset();
      } catch {
        errorEl.textContent = "Failed to post comment.";
        errorEl.classList.remove("hidden");
      }
    });
  }, 100);
});
