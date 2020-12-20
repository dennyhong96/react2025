import { firestore as db } from "./firebase-admin";

export const listFeedback = async (siteId) => {
  try {
    const feedbackRef = db.collection("feedback").where("siteId", "==", siteId);
    const snapshot = await feedbackRef.get();

    let siteFeedback = [];
    snapshot.forEach((doc) => {
      siteFeedback = [...siteFeedback, { id: doc.id, ...doc.data() }];
    });

    // Sort feedback
    siteFeedback = siteFeedback.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    return { siteFeedback };
  } catch (error) {
    return { error };
  }
};

export const listSites = async () => {
  try {
    let sitesRef = db.collection("sites");
    const snapshot = await sitesRef.get();

    let sites = [];
    snapshot.forEach((doc) => {
      sites = [...sites, { id: doc.id, ...doc.data() }];
    });

    return { sites };
  } catch (error) {
    return { error };
  }
};

export const listSitesByUser = async (uid) => {
  let sitesRef = db.collection("sites").where("authorId", "==", uid);
  const snapshot = await sitesRef.get();

  let sites = [];
  snapshot.forEach((doc) => {
    sites = [...sites, { id: doc.id, ...doc.data() }];
  });

  return { sites };
};
