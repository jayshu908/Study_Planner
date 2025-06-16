// backend/firebase-config.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeD7RtAFo6QtPnwlikiZqRv6EMsDMw8yE",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourapp-id",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Auth
const auth = getAuth(app);

// Export both app and auth in case needed
export { app, auth };
