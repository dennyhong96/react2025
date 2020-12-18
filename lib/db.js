import firebase from "./firebase";

const firestore = firebase.firestore();

export const createUser = (uid, user) =>
  firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...user }, { merge: true });
