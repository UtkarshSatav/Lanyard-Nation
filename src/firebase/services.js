import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDocs,
    getDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    limit,
    writeBatch
} from "firebase/firestore";
import { db } from "./config";

// --- Order Services ---

export const createOrder = async (orderData) => {
    try {
        const ordersRef = collection(db, "orders");
        const docRef = await addDoc(ordersRef, {
            ...orderData,
            status: "pending", // initial status
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating order: ", error);
        return { success: false, error: error.message };
    }
};

export const getAllOrders = async () => {
    try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching orders: ", error);
        throw error;
    }
};

export const getUserOrders = async (userId) => {
    try {
        const ordersRef = collection(db, "orders");
        const q = query(
            ordersRef,
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching user orders: ", error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
            status: status,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating order status: ", error);
        return { success: false, error: error.message };
    }
};

export const updateOrderProductionStatus = async (orderId, status) => {
    try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
            productionStatus: status,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating production status: ", error);
        return { success: false, error: error.message };
    }
};

export const convertQuoteToOrder = async (orderId) => {
    try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
            type: 'order',
            status: 'processing',
            productionStatus: 'awaiting-proof',
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Error converting quote: ", error);
        return { success: false, error: error.message };
    }
};

export const getOrderById = async (orderId) => {
    try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);
        if (orderSnap.exists()) {
            return { id: orderSnap.id, ...orderSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching order: ", error);
        throw error;
    }
};

// --- Product/Inventory Services ---

export const getAllProducts = async () => {
    try {
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }
};

export const getProductById = async (productId) => {
    try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
            return { id: productSnap.id, ...productSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching product: ", error);
        throw error;
    }
};

export const updateProductStock = async (productId, newStock) => {
    try {
        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, {
            stock: newStock,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating stock: ", error);
        return { success: false, error: error.message };
    }
};
export const addProduct = async (productData) => {
    try {
        const productsRef = collection(db, "products");
        const docRef = await addDoc(productsRef, {
            ...productData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding product: ", error);
        return { success: false, error: error.message };
    }
};

export const deleteProduct = async (productId) => {
    try {
        const productRef = doc(db, "products", productId);
        await deleteDoc(productRef);
        return { success: true };
    } catch (error) {
        console.error("Error deleting product: ", error);
        return { success: false, error: error.message };
    }
};
export const bulkAddProducts = async (productsArray) => {
    try {
        const batch = writeBatch(db);
        const productsRef = collection(db, "products");

        productsArray.forEach((product) => {
            const newDocRef = doc(productsRef);
            batch.set(newDocRef, {
                ...product,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        });

        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error("Error bulk adding products: ", error);
        return { success: false, error: error.message };
    }
};
