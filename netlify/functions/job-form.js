const fetch = require("node-fetch");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const data = JSON.parse(event.body);
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  const payload = {
    username: "Sweet Africa Job Bot",
    content: data.content, // Pass content from frontend securely
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to send to Discord");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Sent!" }),
    };
  } catch (err) {
    console.error("Discord Webhook Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};
