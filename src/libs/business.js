import app from "../firebaseConfig";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


// Fetch all businesses
export const getAllBusinesses = async () => {
    const businessesList = collection(db, "businesses");
    const businessesSnapshot = await getDocs(businessesList);
    const businesses = businessesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return businesses;
};

// Fetch a specific business by ID
export const getBusiness = async (businessID) => {
    const businessRef = doc(db, "businesses", businessID);
    const businessDoc = await getDoc(businessRef);
    if (businessDoc.exists()) {
        return { id: businessDoc.id, ...businessDoc.data() };
    } else {
        return null; // Business not found
    }
};

// Add a new business
export const addBusiness = async (businessID, businessData) => {
    const businessRef = doc(db, "businesses", businessID);
    try {
        await setDoc(businessRef, businessData);
        console.log("Business added successfully");
    } catch (error) {
        console.error("Error adding business:", error);
    }
};

// Update business details
export const updateBusiness = async (businessID, updatedData) => {
    const businessRef = doc(db, "businesses", businessID);
    try {
        await updateDoc(businessRef, updatedData);
        console.log("Business updated successfully");
    } catch (error) {
        console.error("Error updating business:", error);
    }
};

// Delete a business
export const deleteBusiness = async (businessID) => {
    const businessRef = doc(db, "businesses", businessID);
    try {
        await deleteDoc(businessRef);
        console.log("Business deleted successfully");
    } catch (error) {
        console.error("Error deleting business:", error);
    }
};