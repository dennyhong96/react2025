// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { deleteSite } from "@/lib/db";
import { auth } from "@/lib/firebase-admin";
import logger, { prepObjectKeys } from "@/utils/logger";

export default async (req, res) => {
  if (req.method === "DELETE") {
    try {
      // Call firebase to get user id from token
      const { uid } = await auth.verifyIdToken(req.headers.token);

      await deleteSite(req.query.siteId);

      return res.status(200).json({ message: "Site is successfully deleted." });
    } catch (error) {
      logger.error(
        {
          request: {
            headers: prepObjectKeys(req.headers),
            url: req.url,
            method: req.method,
          },
          response: {
            statusCode: res.statusCode,
          },
        },
        error.message
      );

      return res.status(500).json({ error });
    }
  }
};
