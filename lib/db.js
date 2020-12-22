import firebase from "./firebase";
import getStripe from "./getStripe";

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

export const createCheckoutSession = async (uid) => {
  // Create a doc in `checkout_sessions` collection nested inside `user` collection
  const sessionDocRef = await firestore
    .collection("users")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      price: process.env.NEXT_PUBLIC_BASIC_PRICE_ID,
      success_url: `${window.location.origin}/account`,
      cancel_url: `${window.location.origin}/account`,
    });

  // Wait for `CheckoutSession` to get attached by `Subscription Payments` extension
  sessionDocRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();

    // Redirect to Checkout when we have a session
    if (sessionId) {
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
};
