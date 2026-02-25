import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDwChnZXHpcqij1fCqVD9Da19XBfYKWdTs",
    authDomain: "lanyard-oms-db.firebaseapp.com",
    projectId: "lanyard-oms-db",
    storageBucket: "lanyard-oms-db.firebasestorage.app",
    messagingSenderId: "400208645073",
    appId: "1:400208645073:web:96cc6d9dcab0fe7725aef0",
    measurementId: "G-NYMSGZ37EL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, analytics, googleProvider };
export default app;
