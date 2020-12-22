// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { listSitesByUser } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";
import logger, { prepObjectKeys } from "@/utils/logger";

export default async (req, res) => {
  try {
    // Call firebase to get user id from token
    const { uid } = await auth.verifyIdToken(req.headers.token);

    const { sites } = await listSitesByUser(uid);

    return res.status(200).json({ sites });
  } catch (error) {
    logger.info(
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
};
