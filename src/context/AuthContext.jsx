import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    useEffect(() => {
        let unsubscribeFromFirestore = null;

        const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                // Listen to real-time updates for this user's profile
                unsubscribeFromFirestore = onSnapshot(doc(db, "users", user.uid), (doc) => {
                    if (doc.exists()) {
                        setUserData(doc.data());
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Error listening to user data:", error);
                    setLoading(false);
                });
            } else {
                setCurrentUser(null);
                setUserData(null);
                if (unsubscribeFromFirestore) unsubscribeFromFirestore();
                setLoading(false);
            }
        });

        return () => {
            unsubscribeFromAuth();
            if (unsubscribeFromFirestore) unsubscribeFromFirestore();
        };
    }, []);

    const value = {
        currentUser,
        userData,
        isAdmin: userData?.role === "admin",
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
