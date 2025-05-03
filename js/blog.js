const firebaseConfig = {
  apiKey: "AIzaSyCP1DrT1LkOwm4947b3_5A_65udWly0g5E",
  authDomain: "sweet-africa-global-db.firebaseapp.com",
  projectId: "sweet-africa-global-db",
  storageBucket: "sweet-africa-global-db.firebasestorage.app",
  messagingSenderId: "273787683112",
  appId: "1:273787683112:web:db0a43890f198bf8be101d",
  measurementId: "G-RTFCK2BFQ4",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let hasLoaded = false;

async function loadBlogs() {
  console.log("🔁 loadBlogs called");
  if (hasLoaded) return;
  hasLoaded = true;

  console.log("⏳ Loading blogs...");
  const blogList = document.getElementById("blogList");
  const blogLoader = document.getElementById("blogLoader");

  if (!blogList) {
    console.error("❌ blogList container not found!");
    return;
  }

  blogList.innerHTML = "";

  try {
    const querySnapshot = await db
      .collection("blogs")
      .orderBy("timestamp", "desc")
      .get();
    console.log(`✅ Fetched ${querySnapshot.size} blog(s) from Firestore.`);

    querySnapshot.forEach((doc) => {
      const blog = doc.data();

      const blogCard = `
        <a class="group block rounded-xl overflow-hidden focus:outline-none" href="${blog.slug}">
          <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <div class="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
              <img class="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl" src="${blog.image}" alt="Blog Image">
            </div>
            <div class="grow">
              <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600">${blog.title}</h3>
              <p class="mt-3 text-gray-600">${blog.content}</p>
              <p class="mt-4 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium">
                Read more
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </p>
            </div>
          </div>
        </a>
      `;

      blogList.insertAdjacentHTML("beforeend", blogCard);
    });
  } catch (error) {
    console.error("❌ Failed to load blogs:", error);
  } finally {
    if (blogLoader) blogLoader.remove();
  }
}

console.log("📌 blog.js loaded");

window.addEventListener("DOMContentLoaded", () => {
  console.log("⚡ DOMContentLoaded triggered");
  loadBlogs();
});
