const fetch = require("node-fetch");

exports.handler = async function (event) {
  try {
    const {
      firstName,
      lastName,
      age,
      nationality,
      gender,
      zip,
      shift,
      daysAvailable,
      phone,
      email,
      consent,
    } = JSON.parse(event.body);

    const webhook = process.env.JOB_FORM;

    if (!webhook) {
      console.error("❌ Missing webhook environment variable.");
      return {
        statusCode: 500,
        body: "Missing webhook URL",
      };
    }

    const content = `<@&1346209596674408581> 📋 **New Job Application Submitted**
**Name:** ${firstName} ${lastName}
**Age:** ${age}
**Nationality:** ${nationality}
**Gender:** ${gender}
**ZIP Code:** ${zip}
**Preferred Shift(s):** ${shift}
**Available Days:** ${daysAvailable}
**Phone:** ${phone}
**Email:** ${email || "Not provided"}
**Background Check Consent:** ${consent}`;

    const payload = {
      username: "Sweet Africa Job Bot",
      content,
    };

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
