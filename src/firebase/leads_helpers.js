import {
    Timestamp,
    addDoc,
    collection,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { firestore } from "./firebase_init";
import store from "@/redux/store";

const leadsCollection = collection(firestore, "leads");
export const addNewLead = async (msg) => {
    /**
     * LEAD STATUSES
     * New: The lead has been newly generated or entered into the system and has not been contacted yet.
     * Contacted: The lead has been reached out to by the sales team or representative.
     * Working/In Progress: The lead is actively being worked on, with ongoing communication and engagement.
     * On Hold: The lead has expressed interest but is currently unable or unwilling to proceed. This status may be temporary.
     * No Response: The lead has not responded to any outreach attempts.
     * Not Interested: The lead has explicitly expressed disinterest in the product or service.
     */
    const createdDate = Timestamp.now();
    const msgData = {
        ...msg,
        createdDate: createdDate,
        leadStatus: "NEW",
    };
    await addDoc(leadsCollection, msgData);
};

export const streamLeads = () => {
    const unsub = onSnapshot(leadsCollection, (snap) => {
        const leads = snap.docs.map((leadDoc) => {
            const leadData = leadDoc.data();
            return {
                leadID: leadDoc.id,
                ...leadData,
                createdDate: leadData.createdDate.toDate(),
            };
        });
        store.dispatch({
            type: "SET",
            attr: "leads",
            payload: [...leads],
        });
    });
    return unsub;
};

export const updateLeadStatus = async (leadID, newStatus) => {
    await updateDoc(doc(firestore, "leads", leadID), {
        leadStatus: newStatus,
    });
};
