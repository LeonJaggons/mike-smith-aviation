import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "./firebase_init";
import moment from "moment";

const usersCol = collection(firestore, "users");
export const getAllUsers = async () => {
    const userDocsSnap = await getDocs(query(usersCol));
    const users = userDocsSnap.docs.map((udoc) => {
        const userData = udoc.data();
        return {
            ...userData,
            accessExpirationDate: moment(
                userData.accessExpirationDate.toDate()
            ),
        };
    });
    return users;
};
