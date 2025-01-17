
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
const auth = getAuth(app);

const loginButton = document.getElementById("login");
loginButton.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  const emailPattern = /^[a-z\d]+@(gmail|yahoo|outlook)+\.(com|in|org|co)$/;


  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address (e.g., user@gmail.com).");
    return;
  }


  if (!password) {
    alert("Please enter your password.");
    return;
  }


  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = "./product.html";
    })
    .catch((error) => {
      const errorCode = error.code;


      if (errorCode === "auth/user-not-found") {
        alert("User not found. Please register first.");
      } else if (errorCode === "auth/wrong-password") {
        alert("Password is incorrect. Please try again.");
      } else {
        alert("An error occurred: " + error.message);
      }
    });
});
// reset
const reset = document.getElementById("reset");
reset.addEventListener("click",function(event){
  event.preventDefault()


  const email = document.getElementById("email").value;
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    alert("Email sent")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert(errorMessage)
  });

})