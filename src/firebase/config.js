import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Read Firebase configuration from Vite environment variables with project defaults
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCmIWWaWF8bFciUDXSwm5sh7HzVKiFkwTc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sanctum-athletic-club.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sanctum-athletic-club",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sanctum-athletic-club.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "699988252444",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:699988252444:web:a1b8004fcdb09a0b280cd9",
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== "undefined"
);

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
  } catch (err) {
    console.warn("Sanctum: Firebase initialization encountered a warning. Falling back to local auth simulation.", err);
  }
} else {
  console.info("Sanctum: Firebase environment variables not configured. Running in high-fidelity mock/demo mode.");
}

export { app, auth, db, googleProvider };
