exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // parse the form payload
  const data = JSON.parse(event.body);
  const { name, email, phone, message } = data;

  // grab your webhook from environment
  const webhookURL = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookURL) {
    console.error("No webhook URL set");
    return { statusCode: 500, body: "Configuration error" };
  }

  // build your Discord message
  const discordPayload = {
    content:
      `**New Contact Form Submission**\n` +
      `**Name:** ${name}\n` +
      `**Email:** ${email}\n` +
      `**Phone:** ${phone}\n` +
      `**Message:** ${message}\n`,
  };

  // send to Discord
  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });
  } catch (err) {
    console.error("Discord webhook error", err);
    return { statusCode: 502, body: "Failed to send to Discord" };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: "Message sent" }),
  };
};
