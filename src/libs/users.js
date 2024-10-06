import app from "../firebaseConfig";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Fetch all users
export const getAllUsers = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return usersList;
};

// Fetch a specific user by userID
export const getUser = async (userID) => {
    const userRef = doc(db, "users", userID);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
    } else {
        return null; // User not found
    }
};

// Add a new user
export const addUser = async (userID, userData) => {
    const userRef = doc(db, "users", userID);
    try {
        await setDoc(userRef, userData);
        console.log("User added successfully");
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

// Update user profile
export const updateUser = async (userID, updatedData) => {
    const userRef = doc(db, "users", userID);
    try {
        await updateDoc(userRef, updatedData);
        console.log("User updated successfully");
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

// Delete user
export const deleteUser = async (userID) => {
    const userRef = doc(db, "users", userID);
    try {
        await deleteDoc(userRef);
        console.log("User deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};