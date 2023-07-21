import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage, firestore } from "../firebase/firebase_init";
export const getAllPhotos = async () => {
    const galleryRef = ref(storage, "gallery");
    const photoList = await listAll(galleryRef);
    const photoPromises = photoList.items.map((pRef) => {
        return getDownloadURL(pRef);
    });
    return Promise.all(photoPromises);
};
