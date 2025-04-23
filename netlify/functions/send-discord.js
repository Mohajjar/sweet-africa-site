const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

exports.handler = async function (event, context) {
  // (2) parse the URL-encoded payload
  const data = Object.fromEntries(new URLSearchParams(event.body));

  // Build the message
  const content =
    `**New Contact Form Submission**\n` +
    `• **Name:** ${data.name}\n` +
    `• **Email:** ${data.email}\n` +
    `• **Phone:** ${data.phone}\n` +
    `• **Message:** ${data.message}`;

  try {
    // (3) POST to Discord
    const res = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      // something went wrong at Discord’s end
      const text = await res.text();
      return { statusCode: 502, body: `Discord error: ${text}` };
    }

    // success
    return {
      statusCode: 200,
      body: "✔️ Sent to Discord",
    };
  } catch (err) {
    // network / runtime error
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: `Internal error: ${err.message}`,
    };
  }
};
