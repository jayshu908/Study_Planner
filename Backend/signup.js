// backend/signup.js
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

window.registerUser = function () {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        alert("Account created!");
        window.location.href = "login.html";
      })
      .catch(error => {
        alert("Signup error: " + error.message);
      });
  } else {
    alert("Please fill out all fields.");
  }
};
