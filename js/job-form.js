document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("job-application-form");
  const responseMsg = document.getElementById("form-response");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const shifts = [...form.querySelectorAll('input[name="shift"]:checked')]
      .map((i) => i.value)
      .join(", ");

    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      age: data.get("age"),
      nationality: data.get("nationality"),
      gender: data.get("gender"),
      shift: shifts,
      daysAvailable: data.get("daysAvailable"),
      phone: data.get("phone"),
      email: data.get("email") || "Not provided",
      zip: data.get("zip"),
      consent: data.get("consent"),
    };

    try {
      const res = await fetch("/.netlify/functions/job-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        responseMsg.textContent = "✅ Application submitted successfully!";
        responseMsg.className = "text-green-600 mt-2";
        form.reset();
      } else {
        throw new Error("Failed to send");
      }
    } catch (err) {
      responseMsg.textContent = "❌ Failed to submit. Please try again.";
      responseMsg.className = "text-red-600 mt-2";
      console.error(err);
    }
  });

  // Format phone number as user types
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function () {
    let input = this.value.replace(/\D/g, "");
    input = input.substring(0, 10);
    const area = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length >= 7) {
      this.value = `(${area}) ${middle}-${last}`;
    } else if (input.length >= 4) {
      this.value = `(${area}) ${middle}`;
    } else if (input.length >= 1) {
      this.value = `(${area}`;
    }
  });
});
