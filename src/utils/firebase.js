// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE,
//   authDomain: "blog-cddc2.firebaseapp.com",
//   projectId: "blog-cddc2",
//   storageBucket: "blog-cddc2.appspot.com",
//   messagingSenderId: "413696194974",
//   appId: "1:413696194974:web:bc0a551cd5558bdf0dbe8f"
// };

const firebaseConfig = {
	apiKey: "AIzaSyA8_jF87zU_75ZVN6g3m75Gz_3ngPuHVo4",
	authDomain: "reactnative-adef7.firebaseapp.com",
	projectId: "reactnative-adef7",
	storageBucket: "reactnative-adef7.appspot.com",
	messagingSenderId: "464991519915",
	appId: "1:464991519915:web:9257dff065edec99cde3ee",
	measurementId: "G-FRQKV3THT3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
