// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCP1DrT1LkOwm4947b3_5A_65udWly0g5E",
  authDomain: "sweet-africa-global-db.firebaseapp.com",
  projectId: "sweet-africa-global-db",
  storageBucket: "sweet-africa-global-db.firebasestorage.app",
  messagingSenderId: "273787683112",
  appId: "1:273787683112:web:db0a43890f198bf8be101d",
  measurementId: "G-RTFCK2BFQ4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance
const analytics = getAnalytics(app);

export { db };
