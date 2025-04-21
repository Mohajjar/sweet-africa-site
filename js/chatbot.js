// js/chatbot.js
import EmojiMart from "https://cdn.jsdelivr.net/npm/emoji-mart@latest/dist/browser.js";

export function initChatbot() {
  // if partial not loaded yet, bail out
  const toggler = document.getElementById("chatbot-toggler");
  if (!toggler) return;

  // --- FIREBASE INIT ---
  firebase.initializeApp({
    apiKey: "AIzaSyBxzRk31KD-N6vORRJBWOleEUUVguUIhr0",
    authDomain: "waiting-list-by-mo.firebaseapp.com",
    projectId: "waiting-list-by-mo",
  });
  const db = firebase.firestore();

  // --- LOCAL STORAGE SETUP ---
  let activeChatMode = "bot";
  const ID_KEY = "chatId",
    MSG_KEY = "chatMessages";
  const DAY = 24 * 60 * 60 * 1000;
  let chatId =
    localStorage.getItem(ID_KEY) ||
    (crypto.randomUUID() && localStorage.setItem(ID_KEY, chatId));
  function getStored() {
    return JSON.parse(localStorage.getItem(MSG_KEY) || "[]");
  }
  function saveStored(m) {
    localStorage.setItem(MSG_KEY, JSON.stringify(m));
  }
  function prune() {
    const now = Date.now();
    saveStored(getStored().filter((m) => now - m.timestamp < DAY));
  }

  // --- UI ELEMENTS ---
  const chatBody = document.querySelector(".chat-body");
  const messageInput = document.querySelector(".message-input");
  const sendMessageBtn = document.getElementById("send-message");
  const closeBtn = document.getElementById("close-chatbot");
  const tabBot = document.getElementById("tab-bot");
  const tabAgent = document.getElementById("tab-live-agent");
  const slider = document.querySelector(".chat-modes .slider");

  function render() {
    prune();
    const msgs = getStored()
      .filter((m) => m.mode === activeChatMode)
      .sort((a, b) => a.timestamp - b.timestamp);
    chatBody.innerHTML = "";
    msgs.forEach((m) => {
      const el = document.createElement("div");
      el.className = `message ${m.type}-message`;
      const time = new Date(m.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      el.innerHTML =
        m.type === "bot"
          ? `<img class="bot-avatar" src="images/robotic.avif" width="40" height="40">
           <div class="message-text">${m.text}<span class="timestamp">${time}</span></div>`
          : `<div class="message-text">${m.text}<span class="timestamp">${time}</span></div>`;
      chatBody.appendChild(el);
    });
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // --- REAL‑TIME FIRESTORE LISTENER ---
  db.collection(chatId)
    .orderBy("createdAt", "asc")
    .onSnapshot((snap) => {
      snap.docChanges().forEach((ch) => {
        if (ch.type === "added") {
          const d = ch.doc.data();
          const ts = d.createdAt?.toDate().getTime() || Date.now();
          const arr = getStored();
          if (!arr.find((m) => m.id === ch.doc.id)) {
            arr.push({
              id: ch.doc.id,
              type: "bot",
              text: d.text,
              timestamp: ts,
              mode: "liveAgent",
            });
            saveStored(arr);
          }
        }
      });
      render();
    });

  render();

  // --- TOGGLER & CLOSE ---
  toggler.addEventListener("click", () =>
    document.body.classList.toggle("show-chatbot")
  );
  closeBtn.addEventListener("click", () =>
    document.body.classList.remove("show-chatbot")
  );

  // --- TAB SWITCHING ---
  tabBot.addEventListener("click", () => {
    activeChatMode = "bot";
    slider.style.transform = "translateX(0)";
    tabBot.classList.add("active");
    tabAgent.classList.remove("active");
    render();
  });
  tabAgent.addEventListener("click", () => {
    activeChatMode = "liveAgent";
    slider.style.transform = "translateX(100%)";
    tabAgent.classList.add("active");
    tabBot.classList.remove("active");
    render();
  });

  // --- EMOJI PICKER ---
  const picker = new window.EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (e) => {
      const { selectionStart: s, selectionEnd: e2 } = messageInput;
      messageInput.setRangeText(e.native, s, e2, "end");
      messageInput.focus();
    },
    onClickOutside: (ev) => {
      document.body.classList.toggle(
        "show-emoji-picker",
        ev.target.id === "emoji-picker"
      );
    },
  });
  document.querySelector(".chat-form").appendChild(picker);

  // --- SENDING A MESSAGE ---
  async function sendMessage(isLive) {
    const txt = messageInput.value.trim();
    if (!txt) return;
    const id = crypto.randomUUID();
    const cached = getStored();
    cached.push({
      id,
      type: "user",
      text: txt,
      timestamp: Date.now(),
      mode: activeChatMode,
    });
    saveStored(cached);
    messageInput.value = "";
    render();

    // show thinking indicator
    const think = document.createElement("div");
    think.className = "bot-message thinking";
    think.innerHTML = `<img class="bot-avatar" src="images/robotic.avif" width="40" height="40">
                        <div class="message-text">
                          <div class="thinking-indicator">
                            <div class="dot"></div><div class="dot"></div><div class="dot"></div>
                          </div>
                        </div>`;
    chatBody.appendChild(think);
    chatBody.scrollTop = chatBody.scrollHeight;

    const url = isLive ? LIVE_AGENT_API_URL : BOT_API_URL;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: txt, chatId }),
      });
      if (!isLive) {
        const { reply } = await res.json();
        cached.push({
          id: crypto.randomUUID(),
          type: "bot",
          text: reply,
          timestamp: Date.now(),
          mode: "bot",
        });
        saveStored(cached);
      }
    } catch (e) {
      console.error(e);
    } finally {
      render();
    }
  }

  sendMessageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sendMessage(activeChatMode === "liveAgent");
  });
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(activeChatMode === "liveAgent");
    }
  });
}
