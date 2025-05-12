const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

exports.handler = async function (event, context) {
  const data = Object.fromEntries(new URLSearchParams(event.body));

  // Trim fields
  const name = data.name?.trim();
  const email = data.email?.trim();
  const phone = data.phone?.trim() || "Not provided";
  const message = data.message?.trim();
  const inquiry = data.inquiry?.trim() || "Not specified";

  // 🔒 Backend validation
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: "❌ Missing required fields: name, email, and message are required.",
    };
  }

  // Build the message
  const content =
    `📬 **New Contact Form Submission**\n` +
    `• **Name:** ${name}\n` +
    `• **Email:** ${email}\n` +
    `• **Phone:** ${phone}\n` +
    `• **Inquiry:** ${inquiry}\n` +
    `• **Message:** ${message}`;

  try {
    const res = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { statusCode: 502, body: `Discord error: ${text}` };
    }

    return {
      statusCode: 200,
      body: "✔️ Sent to Discord",
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: `Internal error: ${err.message}`,
    };
  }
};
