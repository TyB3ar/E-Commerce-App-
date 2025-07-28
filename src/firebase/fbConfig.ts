// Firebase and Firestore config 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/*
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
};
*/

const firebaseConfig = {
  apiKey: "AIzaSyCirDCbMtYVQuQNEpGhG9iUq0qsf9WV3eM",
  authDomain: "e-commerce-app-3b04f.firebaseapp.com",
  projectId: "e-commerce-app-3b04f",
  storageBucket: "e-commerce-app-3b04f.firebasestorage.app",
  messagingSenderId: "300185760890",
  appId: "1:300185760890:web:29d0bf242a8d42814977c3"
};

const app = initializeApp(firebaseConfig); 
const auth: Auth = getAuth(app); 
const db = getFirestore(app); 

export { auth, db }; 
