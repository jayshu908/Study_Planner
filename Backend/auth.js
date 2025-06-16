// backend/auth.js

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

import { app } from "./firebase-config.js"; // Make sure this is exporting 'app' properly

const auth = getAuth(app);

// Login function (used in login.html)
export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Login successful!");
      window.location.href = "dashboard.html"; // redirect on success
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });
}

// Signup function (used in signup.html)
export function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Signup successful!");
      window.location.href = "dashboard.html"; // redirect on success
    })
    .catch(error => {
      alert("Signup failed: " + error.message);
    });
}
