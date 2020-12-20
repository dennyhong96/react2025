// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "@/lib/firebase-admin";

export default async (req, res) => {
  try {
    const sitesRef = db.collection("sites");
    const snapshot = await sitesRef.get();

    if (snapshot.empty) {
      throw new Error("No matching documents.");
    }

    let sites = [];
    snapshot.forEach((doc) => {
      sites = [...sites, { id: doc.id, ...doc.data() }];
    });

    res.status(200).json({ sites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
