import firebase from "./firebase";

const firestore = firebase.firestore();

export const createUser = (uid, user) =>
  firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...user }, { merge: true });

export const createSite = (data) => {
  const doc = firestore.collection("sites").doc();
  doc.set(data);
  // Get doc.id before saving the document to DB
  return doc;
};

export const createFeedback = (data) => firestore.collection("feedback").add(data);

export const deleteFeedback = (id) => firestore.collection("feedback").doc(id).delete();
