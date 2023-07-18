import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase_init";
import { getUserByID } from "./firestore_helpers";
import store from "@/redux/store";
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
