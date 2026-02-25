import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup
} from "firebase/auth";
import { auth, db, googleProvider } from "./config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Check if user document exists, if not create it
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                fullName: user.displayName,
                role: "customer",
                createdAt: new Date()
            });
        }
        return { user, success: true };
    } catch (error) {
        return { error: error.message, success: false };
    }
};

export const signUp = async (email, password, fullName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email,
            fullName,
            role: "customer", // Default role
            createdAt: new Date()
        });

        return { user, success: true };
    } catch (error) {
        return { error: error.message, success: false };
    }
};

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, success: true };
    } catch (error) {
        return { error: error.message, success: false };
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { error: error.message, success: false };
    }
};

export const getUserData = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            return userDoc.data();
        }
        return null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};
