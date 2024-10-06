import app  from "../../firebaseConfig.js";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

export const getAllRewards = async () => {
    const rewardsList = collection(db, "rewards");
    const rewardsSnapshot = await getDocs(rewardsList);
    const rewards = rewardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return rewards;
}

export const getReward = async (rewardId) => {
    const rewardRef = doc(db, "rewards", rewardId);
    const rewardDoc = await getDoc(rewardRef);
    if (rewardDoc.exists()){
        return {id: rewardDoc.id, ...rewardDoc.data()};
    }
    else {
        return null;
    }
}

export const addReward = async (rewardId, rewardData) => {
    const rewardRef = doc(db, "rewards", rewardId);
    try {
        await setDoc(rewardRef, rewardData);
        console.log(`Reward ${rewardId} added successfully`);
    } catch (error) {
        console.error(`Error adding reward ${rewardId}:`, error);
    }
};



// Function to add multiple test rewards
export const addTestRewards = async () => {
    const testRewards = [
        { id: "free_coffee", data: { title: "Free Coffee", description: "Enjoy a free coffee at the local cafe.", cost: 100 } },
        { id: "movie_ticket", data: { title: "Movie Ticket", description: "Redeem for a free movie ticket at the local theater.", cost: 200 } },
        { id: "gift_card", data: { title: "Gift Card", description: "Redeem for a gift card at a local store.", cost: 500 } },
        { id: "free_lunch", data: { title: "Free Lunch", description: "Enjoy a free lunch at a local restaurant.", cost: 300 } },
        { id: "discount_coupon", data: { title: "Discount Coupon", description: "Redeem for a discount coupon at a local store.", cost: 50 } }
    ];

    for (const reward of testRewards) {
        await addReward(reward.id, reward.data);
    }
};

addTestRewards();

// Function to update a reward
export const updateReward = async (rewardId, updatedData) => {
    const rewardRef = doc(db, "rewards", rewardId);
    try {
        await updateDoc(rewardRef, updatedData);
        console.log("Reward updated successfully");
    } catch (error) {
        console.error("Error updating reward:", error);
    }
};

// Function to delete a reward
export const deleteReward = async (rewardId) => {
    const rewardRef = doc(db, "rewards", rewardId);
    try {
        await deleteDoc(rewardRef);
        console.log("Reward deleted successfully");
    } catch (error) {
        console.error("Error deleting reward:", error);
    }
};