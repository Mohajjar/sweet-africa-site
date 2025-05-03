// Only run ONCE, then remove this file or comment out the call at the bottom
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

async function importBlogs() {
  const blogs = [
    {
      title: "The Post Easter Reality Check",
      content: "How to Actually Clean Up After the Holidays.",
      author: "Sweet Africa Team",
      image: "images/Blog images/4.jpg",
      slug: "blog-articles/Post-Easter.html",
    },
    {
      title: "Good Friday Quiet Time",
      content: "A Cleaning Meditation for Stress Relief.",
      author: "Sweet Africa Team",
      image: "images/Blog images/Untitled-design-23.jpg",
      slug: "blog-articles/goodfriday.html",
    },
    {
      title: "Why Your ‘Clean’ Studio Apartment Always Smells Like Dinner",
      content: "(And How to Fix It).",
      author: "Sweet Africa Team",
      image: "images/Blog images/Untitled-design-22.jpg",
      slug: "blog-articles/smellslikedinner.html",
    },
    {
      title: "That One Kitchen Drawer Everyone Avoids",
      content: "(And What It Says About Your Habits).",
      author: "Sweet Africa Team",
      image: "images/Blog images/Untitled-design-20.jpg",
      slug: "blog-articles/thatonekitchen.html",
    },
    {
      title: "Your Vacuum is Lying to You",
      content: "The Dirt It’s Leaving Behind.",
      author: "Sweet Africa Team",
      image: "images/Blog images/Untitled-design-18.jpg",
      slug: "blog-articles/vacuumlying.html",
    },
    {
      title: "The Science of Smell",
      content: "How to Actually Freshen Your Home (Not Just Mask Odors).",
      author: "Sweet Africa Team",
      image: "images/Blog images/Untitled-design-19.jpg",
      slug: "blog-articles/smell.html",
    },
    {
      title: "The Psychological Reason Clutter Stresses You Out",
      content: "(Backed by Science).",
      author: "Sweet Africa Team",
      image: "images/Blog images/Untitled-design-17.jpg",
      slug: "blog-articles/psychological.html",
    },
    {
      title: "How to Clean Your Home",
      content: "Without Harsh Chemicals.",
      author: "Sweet Africa Team",
      image: "images/Blog images/Untitled-design-16.jpg",
      slug: "blog-articles/howtocleanyourhome.html",
    },
    {
      title: "How to Keep Your Home Clean With Pets",
      content: "(Without Losing Your Mind).",
      author: "Sweet Africa Team",
      image: "images/Blog images/Untitled-design-14.png",
      slug: "blog-articles/cleanwithpets.html",
    },
    {
      title: "Why Does My House Always Feel Dirty",
      content: "No Matter How Much I Clean?",
      author: "Sweet Africa Team",
      image: "images/Blog images/Untitled-design-15.png",
      slug: "blog-articles/feelsdirty.html",
    },
    {
      title: "10 Signs You’re Too Busy to Clean",
      content: "(And Need Help).",
      author: "Sweet Africa Team",
      image:
        "images/Blog images/10-Signs-Youre-Too-Busy-to-Clean-And-Need-Help.png",
      slug: "blog-articles/10signs.html",
    },
    {
      title: "The Busy Professional’s Guide to Spotless Spaces",
      content: "(Without Lifting a Finger).",
      author: "Sweet Africa Team",
      image:
        "images/Blog images/The-Busy-Professionals-Guide-to-Spotless-Spaces-Without-Lifting-a-Finger.png",
      slug: "blog-articles/busypro.html",
    },
    {
      title: "Easy Sanitization Hacks",
      content: "For Highland’s Small Businesses.",
      author: "Sweet Africa Team",
      image: "images/Blog images/Screenshot 2025-05-03 at 2.44.53 PM.png",
      slug: "blog-articles/easy-sanitization-hacks.html",
    },
  ];

  for (const blog of blogs) {
    try {
      await db.collection("blogs").add({
        ...blog,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`✅ Added: ${blog.title}`);
    } catch (err) {
      console.error(`❌ Failed to add: ${blog.title}`, err);
    }
  }
}

// importBlogs(); // ⚠️ Only run once
