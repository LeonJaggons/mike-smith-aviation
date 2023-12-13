import {
    Timestamp,
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { firestore } from "./firebase_init";
import store from "@/redux/store";
import moment from "moment";

const leadsCollection = collection(firestore, "leads");
function timeSince(date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (const [interval, secondsInInterval] of Object.entries(intervals)) {
        const intervalCount = Math.floor(seconds / secondsInInterval);

        if (intervalCount > 1) {
            return `${intervalCount} ${interval}s ago`;
        } else if (intervalCount === 1) {
            return `1 ${interval} ago`;
        }
    }

    return "Just now";
}

// Example usage:
const someDate = new Date("2023-11-08T12:00:00"); // Replace this with your desired date
console.log(timeSince(someDate));

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
        deleted: false,
    };
    await addDoc(leadsCollection, msgData);
};

export const streamLeads = () => {
    const leadQry = query(
        leadsCollection,
        where("deleted", "==", false),
        orderBy("createdDate", "desc")
    );
    const unsub = onSnapshot(leadQry, (snap) => {
        const leads = snap.docs.map((leadDoc) => {
            const leadData = leadDoc.data();
            return {
                leadID: leadDoc.id,
                ...leadData,
                createdDate: moment(leadData.createdDate.toDate()),

                leadAge: timeSince(leadData.createdDate.toDate()),
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

export const softDeleteLead = async (leadId) => {
    await updateDoc(doc(firestore, "leads", leadId), { deleted: true });
};
