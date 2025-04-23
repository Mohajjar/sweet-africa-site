// replace this with your actual webhook URL
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

exports.handler = async (event) => {
  // Netlify form posts come in event.body as a URL-encoded string.
  const data = Object.fromEntries(new URLSearchParams(event.body));

  // Build a little Discord message
  const content =
    `**New Contact Form Submission**\n` +
    `• **Name:** ${data.name}\n` +
    `• **Email:** ${data.email}\n` +
    `• **Phone:** ${data.phone}\n` +
    `• **Message:** ${data.message}`;

  // POST to Discord
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  // Let Netlify know we succeeded
  return {
    statusCode: 200,
    body: "✔️ Sent to Discord",
  };
};
