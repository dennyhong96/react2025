import firebase from "./firebase";
import getStripe from "./getStripe";

const firestore = firebase.firestore();
const app = firebase.app();

export const createUser = (uid, userData) =>
  firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...userData }, { merge: true });

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
  return await firestore
    .collection("sites")
    .doc(siteId)
    .set({ ...updateData }, { merge: true });
};

// Feedback
export const createFeedback = (data) => firestore.collection("feedback").add(data);

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
