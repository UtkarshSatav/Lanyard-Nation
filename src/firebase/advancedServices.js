import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    limit,
    increment,
    setDoc
} from "firebase/firestore";
import { db } from "./config";

// --- Pricing & Promotions ---

/**
 * Validates a coupon code and returns its discount data
 */
export const validateCoupon = async (code, orderValue) => {
    try {
        const promoRef = collection(db, "promotions");
        const q = query(promoRef, where("code", "==", code), where("is_active", "==", true));
        const snap = await getDocs(q);

        if (snap.empty) return { valid: false, message: "Invalid coupon code" };

        const promo = { id: snap.docs[0].id, ...snap.docs[0].data() };
        const now = new Date();

        if (promo.start_date && promo.start_date.toDate() > now) return { valid: false, message: "Promotion not yet started" };
        if (promo.end_date && promo.end_date.toDate() < now) return { valid: false, message: "Promotion expired" };
        if (promo.usage_limit && promo.used_count >= promo.usage_limit) return { valid: false, message: "Coupon limit reached" };
        if (promo.min_order_value && orderValue < promo.min_order_value) {
            return { valid: false, message: `Min order value for this coupon is ₹${promo.min_order_value}` };
        }

        return { valid: true, promo };
    } catch (error) {
        console.error("Error validating coupon:", error);
        return { valid: false, message: "Error validating coupon" };
    }
};

/**
 * Calculates current pricing based on quantity and variant attributes
 */
export const calculatePricing = async (productId, quantity, attributes) => {
    try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        if (!productSnap.exists()) throw new Error("Product not found");

        const product = productSnap.data();

        // Fetch price chart for this product and specific width/attribute
        const chartsRef = collection(db, "priceCharts");
        const q = query(
            chartsRef,
            where("product_id", "==", productId),
            where("attribute_value", "==", attributes.width || "standard")
        );
        const chartSnap = await getDocs(q);

        let unitPrice = product.price || 0;
        let setupFee = 0;

        if (!chartSnap.empty) {
            const chart = chartSnap.docs[0].data();
            setupFee = chart.setup_fee || 0;
            const range = chart.ranges.find(r => quantity >= r.min && (!r.max || quantity <= r.max));
            if (range) {
                unitPrice = range.price;
            }
        }

        const subtotal = (unitPrice * quantity) + setupFee;
        return {
            unitPrice,
            setupFee,
            subtotal,
            total: subtotal // Coupon would be applied separately
        };
    } catch (error) {
        console.error("Error calculating price:", error);
        throw error;
    }
};

// --- Digital Proofs ---

/**
 * Creates a proof request when an order is placed
 */
export const createProofRequest = async (orderId, metadata) => {
    try {
        const slaDeadline = new Date();
        slaDeadline.setHours(slaDeadline.getHours() + 1); // 1-hour SLA

        const proofRef = collection(db, "proofs");
        await setDoc(doc(proofRef, orderId), {
            order_id: orderId,
            status: "PENDING",
            imprint_text: metadata.imprint_text || "",
            logo_url: metadata.logo_url || "",
            sla_deadline: slaDeadline,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp()
        });

        // Update order status to PROOF_PENDING
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
            status: "PROOF_PENDING",
            updatedAt: serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        console.error("Error creating proof request:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Fetches orders that are nearing or have breached proof SLA
 */
export const getSLAStatus = async () => {
    const now = new Date();
    const warnsThreshold = new Date(now.getTime() + 15 * 60000); // 15 mins before deadline

    const proofsRef = collection(db, "proofs");
    const q = query(proofsRef, where("status", "==", "PENDING"));
    const snap = await getDocs(q);

    const risks = [];
    const breached = [];

    snap.forEach(doc => {
        const data = doc.data();
        const deadline = data.sla_deadline.toDate();
        if (deadline < now) {
            breached.push({ id: doc.id, ...data });
        } else if (deadline < warnsThreshold) {
            risks.push({ id: doc.id, ...data });
        }
    });

    return { risks, breached };
};

// --- Reviews Service ---

export const submitReview = async (reviewData) => {
    try {
        const reviewsRef = collection(db, "reviews");
        await addDoc(reviewsRef, {
            ...reviewData,
            createdAt: serverTimestamp()
        });

        // Update product aggregate stats
        const productRef = doc(db, "products", reviewData.productId);
        await updateDoc(productRef, {
            review_count: increment(1),
            total_rating: increment(reviewData.rating),
            updatedAt: serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        console.error("Error submitting review:", error);
        return { success: false, error: error.message };
    }
};

export const getGlobalReviewStats = async () => {
    try {
        const statsRef = doc(db, "siteMetadata", "reviews");
        const snap = await getDoc(statsRef);
        return snap.exists() ? snap.data() : { totalReviews: "100,000+", avgRating: 4.9 };
    } catch (error) {
        console.error("Error fetching global stats:", error);
        return { totalReviews: "100,000+", avgRating: 4.9 };
    }
};

// --- CMS & Content ---

export const getSiteContent = async (type) => {
    try {
        const contentRef = doc(db, "content", type);
        const snap = await getDoc(contentRef);
        return snap.exists() ? snap.data() : null;
    } catch (error) {
        console.error("Error fetching content:", error);
        return null;
    }
};

export const updateSiteContent = async (type, data) => {
    try {
        const contentRef = doc(db, "content", type);
        await setDoc(contentRef, {
            ...data,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return { success: true };
    } catch (error) {
        console.error("Error updating content:", error);
        return { success: false, error: error.message };
    }
};
