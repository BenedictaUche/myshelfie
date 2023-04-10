// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2gryi8izgfFQWqZKr3blw1RSZAXVg2Jw",
    authDomain: "myshelfie-project.firebaseapp.com",
    projectId: "myshelfie-project",
    storageBucket: "myshelfie-project.appspot.com",
    messagingSenderId: "331553811688",
    appId: "1:331553811688:web:887aab25bd6ff41fc7ed5d",
    measurementId: "G-F8GK80T8HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app
