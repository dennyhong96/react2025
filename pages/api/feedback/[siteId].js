import { getSite, listFeedbackBySite } from "@/lib/db-admin";
import logger, { prepObjectKeys } from "@/utils/logger";

export default async (req, res) => {
  try {
    const requestPromiess = [listFeedbackBySite(req.query.siteId), getSite(req.query.siteId)];
    const [{ feedback }, { site }] = await Promise.all(requestPromiess);

    res.status(200).json({ feedback, site });
  } catch (error) {
    console.error(error);

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
