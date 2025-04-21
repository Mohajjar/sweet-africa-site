const functions = require("firebase-functions");
const { chatWithGemini } = require("../../Backend2.0/chatbot");
const { sendMessageToLiveAgent } = require("../../Backend2.0/livechat");

exports.chatWithGemini = chatWithGemini;
exports.sendMessageToLiveAgent = sendMessageToLiveAgent;
