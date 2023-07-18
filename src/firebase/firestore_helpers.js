import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase_init";

export const getUserByID = async (uid) => {
    const userRef = doc(firestore, "users", uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return userDoc.data();
    }
};
