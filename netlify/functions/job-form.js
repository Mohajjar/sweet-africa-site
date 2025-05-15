const fetch = require("node-fetch");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { content } = JSON.parse(event.body);
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing webhook URL" }),
      };
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Sweet Africa Job Bot",
        content,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message to Discord");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message sent to Discord" }),
    };
  } catch (error) {
    console.error("❌ Discord webhook error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send" }),
    };
  }
};
