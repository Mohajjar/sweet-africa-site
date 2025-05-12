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
      username: "Sweet Africa Job Bot",
      content: `<@&1346209596674408581> 📋 **New Job Application Submitted**
**Name:** ${data.get("firstName")} ${data.get("lastName")}
**Age:** ${data.get("age")}
**Nationality:** ${data.get("nationality")}
**Gender:** ${data.get("gender")}
**Preferred Shift(s):** ${shifts}
**Available Days:** ${data.get("daysAvailable")}
**Phone:** ${data.get("phone")}
**Email:** ${data.get("email") || "Not provided"}
**Background Check Consent:** ${data.get("consent")}`,
    };

    try {
      const res = await fetch(
        "https://discord.com/api/webhooks/1371089381040853012/QrYy22unQfHDGUo6ISSjrZRDHCDHVty8lguRAOKmT--7HzuHKPbndh-mdmfUgg_39Ldq",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

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
});

document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");

  phoneInput.addEventListener("input", function (e) {
    let input = this.value.replace(/\D/g, ""); // Remove non-digits

    if (input.length > 0) {
      input = input.substring(0, 10); // Max 10 digits
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
    }
  });
});
