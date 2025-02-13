import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB03LJr7MJqEKnadpRMhIcjFNJdyzJTqc8",
  authDomain: "harmonia-hub-project.firebaseapp.com",
  databaseURL: "https://harmonia-hub-project-default-rtdb.firebaseio.com",
  projectId: "harmonia-hub-project",
  storageBucket: "harmonia-hub-project.firebasestorage.app",
  messagingSenderId: "1083132333592",
  appId: "1:1083132333592:web:0f92d3ba502ad26197bd6d",
  measurementId: "G-NGJV06H7YF"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const emailPattern = /^[a-z\d]+@(gmail|yahoo|outlook)+\.(com|in|org|co)$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[$%&#@]).{8,16}$/;

  if (!emailPattern.test(email)) {
    alert(
      "Invalid email format! Please use a valid email (e.g., user@gmail.com)."
    );
    return;
  }

  if (!passwordPattern.test(password)) {
    alert(
      "Invalid password format! Password must contain at least:\n" +
      "- 1 lowercase letter\n" +
      "- 1 uppercase letter\n" +
      "- 1 digit\n" +
      "- 1 special character ($, %, &, #, @)\n" +
      "- Length between 8-16 characters."
    );
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        email: email,
        password: password,
      });

      alert("Account created successfully!");
      window.location.href = "./login.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});



