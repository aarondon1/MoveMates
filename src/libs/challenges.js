import app from "../../firebaseConfig.js";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

// Function to add a new challenge
const addNewChallenge = async (challengeId, challengeData) => {
    const challengeRef = doc(db, "challenges", challengeId);
    try {
        await setDoc(challengeRef, challengeData);
        console.log(`Challenge ${challengeId} added successfully`);
    } catch (error) {
        console.error(`Error adding challenge ${challengeId}:`, error);
    }
};

// Function to add multiple test challenges
const addTestChallenges = async () => {
    const testChallenges = [
        { id: "bike_challenge_5k", data: { title: "Bike 5K Challenge", description: "Complete a 5 kilometer bike ride by the end of the week.", startDate: new Date(), endDate: new Date(new Date().setDate(new Date().getDate() + 7)), participants: [], goal: 5000, status: "active" } },
        { id: "10k_steps_day", data: { title: "10K Steps a Day", description: "Walk 10,000 steps every day for a week.", startDate: new Date(), endDate: new Date(new Date().setDate(new Date().getDate() + 7)), participants: [], goal: 70000, status: "active" } },
        { id: "local_bike_tour", data: { title: "Local Bike Tour", description: "Complete a local bike tour and track the total distance.", startDate: new Date(), endDate: new Date(new Date().setDate(new Date().getDate() + 14)), participants: [], goal: 20000, status: "active" } },
        { id: "step_into_fall", data: { title: "Step into Fall", description: "Walk a total of 50,000 steps during the fall season.", startDate: new Date(), endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), participants: [], goal: 50000, status: "active" } },
        { id: "bike_50k_challenge", data: { title: "Bike 50K Challenge", description: "Complete 50 kilometers of biking over a month.", startDate: new Date(), endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), participants: [], goal: 50000, status: "active" } }
    ];
    

    for (const challenge of testChallenges) {
        await addNewChallenge(challenge.id, challenge.data);
    }
};

// Call the function to add test challenges

export const addParticipant = async (challengeId, userId) => {
    const challengeRef = doc(db, "challenges", challengeId);
    try {
        await updateDoc(challengeRef, {
            participants: arrayUnion(userId) // Add userId to the participants array
        });
        console.log("Participant added successfully");
    } catch (error) {
        console.error("Error adding participant:", error);
    }
};

export const getAllChallenges = async () => {
    const challengesList = collection(db, "challenges");
    const challengesSnapshot = await getDocs(challengesList);
    const challenges = challengesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return challenges;
};
