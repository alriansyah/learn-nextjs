import {
  getFirestore,
  getDoc,
  collection,
  doc,
  getDocs,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retriveDataById(collectionName: string, id: string) {
  const snapshot = getDoc(doc(firestore, collectionName, id));
  const data = (await snapshot).data();

  return data;
}
