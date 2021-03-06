import firebase from "./firebase";
import getStripe from "./getStripe";

const firestore = firebase.firestore();
const app = firebase.app();

// User
export const createUser = (uid, userData) =>
  firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...userData }, { merge: true });

// Site
export const createSite = (data) => {
  const doc = firestore.collection("sites").doc();
  doc.set({
    ...data,
    settings: {
      showTimestamps: true,
      showIcons: true,
      showRatings: true,
    },
  });

  // Get doc.id before saving the document to DB
  return doc;
};

export const updateSite = async (siteId, updateData) => {
  await firestore
    .collection("sites")
    .doc(siteId)
    .set({ ...updateData }, { merge: true });
};

export const deleteSite = async (siteId) => {
  const snapshot = await firestore.collection("feedback").where("siteId", "==", siteId).get();

  // Delete all feedback left on this site
  const deleteBatch = firestore.batch(); // Initialize a batch write
  snapshot.forEach((doc) => {
    deleteBatch.delete(doc.ref); // Add a delete operation to the batch
  });
  const deleteFeedbackPromise = deleteBatch.commit(); // Commit all operations as a single atomic unit.

  // Delete site
  const deleteSitePromise = firestore.collection("sites").doc(siteId).delete();

  await Promise.all([deleteSitePromise, deleteFeedbackPromise]);
};

// Feedback
export const createFeedback = (data) => {
  const doc = firestore.collection("feedback").doc();
  doc.set({ ...data });
  return doc;
};

export const deleteFeedback = (id) =>
  firestore.collection("feedback").doc(id).set({ status: "removed" }, { merge: true });

export const updateFeedbackStatus = async ({ feedbackId, ...updateData }) => {
  await firestore
    .collection("feedback")
    .doc(feedbackId)
    .set({ ...updateData }, { merge: true });
};

// Stripe
export const createCheckoutSession = async (uid) => {
  // Create a doc in `checkout_sessions` collection nested inside `userData` collection
  const sessionDocRef = await firestore
    .collection("users")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      price: process.env.NEXT_PUBLIC_BASIC_PRICE_ID,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
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

// Redirect to the customer portal
export const goToBillingPortal = async () => {
  // Gets a portal link for customer
  const functionRef = app
    .functions("us-central1")
    .httpsCallable("ext-firestore-stripe-subscriptions-createPortalLink");
  const { data } = await functionRef({ returnUrl: `${window.location.origin}/account` });

  // Redirect
  window.location.assign(data.url); // location.assign(url); same as location.href = url;
};
