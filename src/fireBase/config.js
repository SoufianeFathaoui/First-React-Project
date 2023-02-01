// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7TTYqbxNSJqagOgqcRX3FiZZqt63e4Ls",
  authDomain: "soufianefathaoui.firebaseapp.com",
  projectId: "soufianefathaoui",
  storageBucket: "soufianefathaoui.appspot.com",
  messagingSenderId: "624298761351",
  appId: "1:624298761351:web:54f317ac29fcef509f6c22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
