const functions = require("firebase-functions");
const fetch = require("node-fetch");

// === Chat with Gemini endpoint ===
exports.chatWithGemini = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).send("");
  }
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateText?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: { text: message }, temperature: 0.7 }),
      }
    );
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    const reply = data.candidates?.[0]?.output || "No reply.";
    return res.json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err);
    return res.status(500).json({ error: "Bot error" });
  }
});

// === Live Agent endpoint ===
exports.sendMessageToLiveAgent = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).send("");
  }
  try {
    const { message, chatId } = req.body;
    console.log(`LiveAgent msg for ${chatId}:`, message);
    return res.json({ status: "queued" });
  } catch (err) {
    console.error("LiveAgent error:", err);
    return res.status(500).json({ error: "LiveAgent error" });
  }
});
