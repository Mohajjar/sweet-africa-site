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
  <div class="w-full sm:w-1/2 lg:w-1/2 px-4 mb-8">
    <a href="/blog-detail.html?slug=${encodeURIComponent(
      blog.slug
    )}" class="block group">
      <img src="${blog.image}" alt="${
        blog.title
      }" class="rounded-xl w-full h-44 object-cover mb-4 group-hover:opacity-90 transition" />
      <h3 class="text-lg font-semibold text-gray-800 group-hover:text-blue-700 mb-1">${
        blog.title
      }</h3>
      <p class="text-sm text-blue-600 group-hover:underline">Read more &rarr;</p>
    </a>
  </div>
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
