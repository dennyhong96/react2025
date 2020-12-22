import { listFeedbackByUser } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";
import logger from "@/utils/logger";

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);

    const { feedback } = await listFeedbackByUser(uid);

    res.status(200).json({ feedback });
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
    res.status(500).json({ error: error.message });
  }
};
