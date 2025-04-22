// === Global Variables and Mode Setup ===
let activeChatMode = "bot";

// ===== DOM Selections =====
const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageBtn = document.querySelector("#send-message");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");
const tabBot = document.querySelector("#tab-bot");
const tabLiveAgent = document.querySelector("#tab-live-agent");
const slider = document.querySelector(".chat-modes .slider");

// ===== Local Storage Setup =====
const LOCAL_STORAGE_CHAT_ID_KEY = "chatId";
const LOCAL_STORAGE_CHAT_MESSAGES_KEY = "chatMessages";
// Expire messages after 2 hours
const MESSAGE_EXPIRATION_MS = 2 * 60 * 60 * 1000;

let chatId = localStorage.getItem(LOCAL_STORAGE_CHAT_ID_KEY);
if (!chatId) {
  chatId = generateRandomId(12);
  localStorage.setItem(LOCAL_STORAGE_CHAT_ID_KEY, chatId);
}

function getStoredMessages() {
  const raw = localStorage.getItem(LOCAL_STORAGE_CHAT_MESSAGES_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveStoredMessages(messages) {
  localStorage.setItem(
    LOCAL_STORAGE_CHAT_MESSAGES_KEY,
    JSON.stringify(messages)
  );
}

function addMessageToLocalStorage(messageObj) {
  const messages = getStoredMessages();
  if (!messages.find((msg) => msg.id === messageObj.id)) {
    messages.push(messageObj);
    saveStoredMessages(messages);
  }
}

function pruneOldMessages() {
  const now = Date.now();
  // Remove any messages older than expiration
  const messages = getStoredMessages().filter(
    (msg) => now - msg.timestamp < MESSAGE_EXPIRATION_MS
  );
  saveStoredMessages(messages);
}

function loadLocalChatMessages() {
  pruneOldMessages();
  const messages = getStoredMessages()
    .filter((msg) => msg.mode === activeChatMode)
    .sort((a, b) => a.timestamp - b.timestamp);

  chatBody.innerHTML = "";

  messages.forEach((msg) => {
    const timeString = new Date(msg.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    let html = `
      <div class="message-text">${msg.text}</div>
      <span class="timestamp">${timeString}</span>
    `;

    const typeClass =
      msg.type === "bot"
        ? "bot-message"
        : msg.type === "agent"
        ? "agent-message"
        : "user-message";

    chatBody.appendChild(createMessageElement(html, typeClass));
  });

  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
}

// ===== Firebase Setup =====nconst firebaseConfig = {
const firebaseConfig = {
  apiKey: "AIzaSyBxzRk31KD-N6vORRJBWOleEUUVguUIhr0",
  authDomain: "waiting-list-by-mo.firebaseapp.com",
  projectId: "waiting-list-by-mo",
  storageBucket: "waiting-list-by-mo.firebasestorage.app",
  messagingSenderId: "934802752864",
  appId: "1:934802752864:web:e09b5345713a10d9f78a05",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
loadLocalChatMessages();

// ===== API Endpoints =====
const BOT_API_URL =
  "https://chat-bot-ba75c8ca6902.herokuapp.com/chatWithGemini";
const LIVE_AGENT_API_URL =
  "https://chat-bot-ba75c8ca6902.herokuapp.com/sendMessageToLiveAgent";

const messagesQuery = db.collection(chatId).orderBy("createdAt", "asc");

// ===== Firestore Listener =====
messagesQuery.onSnapshot(
  (snapshot) => {
    let added = false;
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const data = change.doc.data();
        const timestamp =
          data.createdAt && typeof data.createdAt.toDate === "function"
            ? data.createdAt.toDate().getTime()
            : Date.now();

        const mode = data.mode || "bot";
        const type = mode === "liveAgent" ? "agent" : "bot";
        const id = change.doc.id;

        if (!getStoredMessages().some((m) => m.id === id)) {
          addMessageToLocalStorage({
            id,
            type,
            text: data.text,
            timestamp,
            mode,
          });
          added = true;
        }
      }
    });
    if (added) loadLocalChatMessages();
  },
  (error) => console.error("Firestore error:", error)
);

// ===== Helpers =====
function createMessageElement(innerHTML, ...classes) {
  const el = document.createElement("div");
  el.classList.add("message", ...classes);
  el.innerHTML = innerHTML;
  return el;
}

// ===== User Message Handling =====
const initialInputHeight = messageInput.scrollHeight;

async function handleOutgoingMessage(e) {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  messageInput.value = "";
  messageInput.dispatchEvent(new Event("input"));

  const id = generateRandomId();
  addMessageToLocalStorage({
    id,
    type: "user",
    text,
    timestamp: Date.now(),
    mode: activeChatMode,
  });
  loadLocalChatMessages();

  if (activeChatMode === "bot") {
    // show thinking bubble only for bot
    const thinkingHTML = `
      <img class=\"bot-avatar\" src=\"chatbot/img/robotic.avif\" alt=\"Avatar\" width=\"50\" height=\"50\" />
      <div class=\"message-text\">
        <div class=\"thinking-indicator\"><div class=\"dot\"></div><div class=\"dot\"></div><div class=\"dot\"></div></div>
      </div>`;
    const bubble = createMessageElement(
      thinkingHTML,
      "bot-message",
      "thinking"
    );
    chatBody.appendChild(bubble);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    await generateBotResponse(bubble, text);
  } else {
    // live-agent: send immediately, no thinking
    await fetch(LIVE_AGENT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, chatId }),
    }).catch((e) => console.error(e));
    loadLocalChatMessages();
  }
}

messageInput.addEventListener("input", () => {
  messageInput.style.height = `${initialInputHeight}px`;
  messageInput.style.height = `${messageInput.scrollHeight}px`;
  document.querySelector(".chat-form").style.borderRadius =
    messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && messageInput.value.trim())
    handleOutgoingMessage(e);
});

sendMessageBtn.addEventListener("click", handleOutgoingMessage);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);
closeChatbot.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);

tabBot.addEventListener("click", () => {
  activeChatMode = "bot";
  document.querySelector(".logo-text").innerText = "Sweet Bot";
  tabBot.classList.add("active");
  tabLiveAgent.classList.remove("active");
  slider.style.transform = "translateX(0)";
  loadLocalChatMessages();
});

tabLiveAgent.addEventListener("click", () => {
  activeChatMode = "liveAgent";
  document.querySelector(".logo-text").innerText = "Live Chat";
  tabLiveAgent.classList.add("active");
  tabBot.classList.remove("active");
  slider.style.transform = "translateX(100%)";
  loadLocalChatMessages();
});

// ===== Emoji Picker =====
const picker = new EmojiMart.Picker({
  theme: "light",
  skinTonePosition: "none",
  previewPosition: "none",
  onEmojiSelect: (emoji) => {
    const { selectionStart: start, selectionEnd: end } = messageInput;
    messageInput.setRangeText(emoji.native, start, end, "end");
    messageInput.focus();
  },
  onClickOutside: (e) => {
    if (e.target.id === "emoji-picker")
      document.body.classList.toggle("show-emoji-picker");
    else document.body.classList.remove("show-emoji-picker");
  },
});
document.querySelector(".chat-form").appendChild(picker);

// ===== ID Generator =====
function generateRandomId(length = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

// ===== Bot Response =====
async function generateBotResponse(el, userText) {
  const contentEl = el.querySelector(".message-text");
  try {
    const res = await fetch(BOT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.message || "Error");
    contentEl.innerText = json.reply;
    addMessageToLocalStorage({
      id: generateRandomId(),
      type: "bot",
      text: json.reply,
      timestamp: Date.now(),
      mode: "bot",
    });
  } catch (e) {
    console.error(e);
    contentEl.innerText = e.message;
    contentEl.style.color = "#ff0000";
  } finally {
    el.classList.remove("thinking");
    loadLocalChatMessages();
  }
}
