const fetch = require("node-fetch");

exports.handler = async function (event) {
  try {
    const data = JSON.parse(event.body);

    // ✅ Check if the webhook URL is available
    const webhook = process.env.JOB_FORM;
    if (!webhook) {
      console.error("❌ Missing webhook environment variable.");
      return {
        statusCode: 500,
        body: "Missing webhook URL",
      };
    }

    // ✅ Log payload to verify structure
    console.log("📦 Payload to Discord:", data);

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Discord error response:", text);
      return {
        statusCode: res.status,
        body: "Failed to send message to Discord",
      };
    }

    return {
      statusCode: 200,
      body: "Message sent to Discord",
    };
  } catch (error) {
    console.error("❌ Discord webhook error:", error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
