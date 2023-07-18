import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";
import { storage, firestore } from "../firebase/firebase_init";
import {
    Timestamp,
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import store from "@/redux/store";
import { getUserByID } from "./firestore_helpers";

const docCollection = collection(firestore, "documents");
const logCollection = collection(firestore, "logs");
export const uploadDocument = async (file, customData) => {
    const filename = file.name;
    const docRef = ref(storage, `documents/${filename}`);
    const snapshot = await uploadBytes(docRef, file);
    const url = await getDownloadURL(snapshot.ref);
    const createdDate = Timestamp.now();
    const documentData = {
        ...customData,
        originalFileName: filename,
        url: url,
        createdDate: createdDate,
        deleted: false,
    };

    const postRef = await addDoc(docCollection, documentData);
    return {
        docID: postRef.id,
        ...documentData,
    };

    // originalFileName
    // fileName
    // fileType
    // documentType
    // description
    // url
    // createdDate
    // createdBy
};

export const deleteDocument = async (dc) => {
    const userID = store.getState().app.user.userID;
    await updateDoc(doc(firestore, "documents", dc.docID), {
        deleted: true,
        deletedBy: userID,
        deletedAt: Timestamp.now(),
    });
    const fileRef = ref(storage, `documents/${dc.originalFileName}`);
    await deleteObject(fileRef);
};

export const streamDocuments = () => {
    const docsQuery = query(docCollection, where("deleted", "==", false));
    const unsub = onSnapshot(docsQuery, (snap) => {
        const docs = snap.docs.map((d) => {
            return {
                docID: d.id,
                ...d.data(),
                createdDate: d.data().createdDate.toDate(),
            };
        });
        store.dispatch({
            type: "SET",
            attr: "documents",
            payload: [...docs],
        });
    });
    return unsub;
};
export const addDocumentUploadLog = async (doc) => {
    const userID = store.getState().app.user.userID;
    const downloadLog = {
        asset: "documents",
        assetID: doc.docID,
        userID: userID,
        activityCode: "UPLOAD",
        createdDate: Timestamp.now(),
        modifiedDate: Timestamp.now(),
    };
    await addDoc(logCollection, downloadLog);
};

export const addDocumentDownloadLog = async (doc) => {
    const userID = store.getState().app.user.userID;
    const downloadLog = {
        asset: "documents",
        assetID: doc.docID,
        userID: userID,
        activityCode: "DOWNLOAD",
        createdDate: Timestamp.now(),
        modifiedDate: Timestamp.now(),
    };
    await addDoc(logCollection, downloadLog);
};

export const addDocumentDeleteLog = async (doc) => {
    const userID = store.getState().app.user.userID;
    const downloadLog = {
        asset: "documents",
        assetID: doc.docID,
        userID: userID,
        activityCode: "DELETE",
        createdDate: Timestamp.now(),
        modifiedDate: Timestamp.now(),
    };
    await addDoc(logCollection, downloadLog);
};

const getDocByID = async (docID) => {
    const docRef = doc(firestore, "documents", docID);
    const docDoc = await getDoc(docRef);
    return docDoc.data();
};

export const getDocumentHistory = async () => {
    const documentHistQuery = query(
        logCollection,
        where("asset", "==", "documents"),
        orderBy("createdDate", "desc")
    );
    const docHistDocs = await getDocs(documentHistQuery);
    let users = {};
    let docs = {};
    const docHist = docHistDocs.docs.map(async (d) => {
        const userID = d.data().userID;
        const docID = d.data().assetID;
        let userInfo;
        if (Object.keys(users).includes(userID)) {
            userInfo = users[[userID]];
        } else {
            userInfo = await getUserByID(userID);
        }
        let docInfo;
        if (Object.keys(docs).includes(docID)) {
            docInfo = docs[[docID]];
        } else {
            docInfo = await getDocByID(docID);
        }

        return {
            ...d.data(),
            ...userInfo,
            docName: docInfo.originalFileName,
        };
    });
    console.log(docHist);
    return Promise.all(docHist);
};
