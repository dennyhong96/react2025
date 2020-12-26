import { firestore as db } from "./firebase-admin";

// Site
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

  return { sites: sites.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)) };
};

export const getSite = async (siteId) => {
  const doc = await db.collection("sites").doc(siteId).get();
  return { site: { id: doc.id, ...doc.data() } };
};

// Feedback
export const listFeedback = async (siteId, route) => {
  try {
    let feedbackRef = db.collection("feedback").where("siteId", "==", siteId);

    if (route) feedbackRef = feedbackRef.where("route", "==", route);

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

export const listFeedbackByUser = async (uid) => {
  const feedbackRef = db
    .collection("feedback")
    .where("authorId", "==", uid)
    .where("status", "in", ["pending", "active"]);
  // "!=" is not a supported query operator
  // Cannot chain multiple `where` on the same field

  const snapshot = await feedbackRef.get();

  let feedback = [];
  snapshot.forEach((doc) => {
    feedback = [...feedback, { id: doc.id, ...doc.data() }];
  });

  return { feedback };
};

export const listFeedbackBySite = async (siteId) => {
  const feedbackRef = db
    .collection("feedback")
    .where("siteId", "==", siteId)
    .where("status", "in", ["pending", "active"]);
  const snapshot = await feedbackRef.get();

  let feedback = [];
  snapshot.forEach((doc) => {
    feedback = [...feedback, { id: doc.id, ...doc.data() }];
  });

  return { feedback };
};

export const listFeedbackForUserSites = async (uid) => {
  const { sites } = await listSitesByUser(uid);
  const siteIds = sites.map((site) => site.id);

  const promises = siteIds.map((siteId) =>
    db
      .collection("feedback")
      .where("siteId", "==", siteId)
      .where("status", "not-in", ["removed"])
      .get()
  );
  const snapshots = await Promise.all(promises);

  const feedback = snapshots.flatMap((snapshot) => {
    let siteFeedback = [];
    snapshot.forEach((doc) => (siteFeedback = [...siteFeedback, { id: doc.id, ...doc.data() }]));

    return siteFeedback.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  });

  return { feedback };
};
