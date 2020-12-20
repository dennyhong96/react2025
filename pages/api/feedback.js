import { listFeedback } from "@/lib/db-admin";

export default async (req, res) => {
  const siteId = req.query.siteId ?? "1pZLo9KTYreZzYBd3ikp";
  const { siteFeedback, error } = await listFeedback(siteId);

  if (error) {
    return res.status(500).json({ error });
  }

  res.status(200).json({ siteFeedback });
};
