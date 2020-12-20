// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { listSites } from "@/lib/db-admin";

export default async (req, res) => {
  const { sites, error } = await listSites();

  if (error) {
    return res.status(500).json({ error });
  }

  res.status(200).json({ sites });
};
