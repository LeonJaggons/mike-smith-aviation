import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firestore, secondaryAuth } from "./firebase_init";
import { getUserByID } from "./firestore_helpers";
import store from "@/redux/store";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import moment from "moment";
export const signInUser = async (creds) => {
    const { email, password } = creds;
    let res;
    const userCreds = await signInWithEmailAndPassword(
        auth,
        email,
        password
    ).catch((err) => {
        res = err;
    });
    if (userCreds) {
        const uid = userCreds.user.uid;
        const user = await getUserByID(uid);
        store.dispatch({
            type: "SET",
            attr: "isSignedIn",
            payload: true,
        });
        store.dispatch({
            type: "SET",
            attr: "user",
            payload: { ...user },
        });
        return user;
    }
    return res;
};

export const createUser = async (userData) => {
    const email = userData.email;
    const password = userData.tempPassword;
    const userCreds = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        password
    );
    // await secondaryAuth.signOut();

    const uid = userCreds.user.uid;
    const adminRole = userData.isAdmin ? 4 : 1;
    const accessExpirationDate = moment()
        .add(userData.isAdmin ? 365 : 30, "days")
        .toDate();

    const currUser = store.getState().app.user;
    const user = {
        ...userData,
        uid: uid,
        adminRole: adminRole,
        accessExpirationDate: accessExpirationDate,
        createdBy: currUser.uid,
        createdAt: Timestamp.now(),
    };

    await setDoc(doc(firestore, "users", uid), user);
};
