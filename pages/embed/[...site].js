import { Box, Text } from "@chakra-ui/react";

import { getSite, listFeedback, listSites } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";

const SiteFeedback = ({ feedback, site }) => {
  return (
    <Box display="flex" flexDirection="column" w="full">
      {feedback?.length ? (
        feedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} settings={site?.settings} />
        ))
      ) : (
        <Text>There are no comments for this site.</Text>
      )}
    </Box>
  );
};

export async function getStaticProps({ params }) {
  const [siteId, route] = params.site;
  const { siteFeedback: feedback } = await listFeedback(siteId, route);
  const { site } = await getSite(siteId);

  return {
    props: {
      feedback: feedback ?? [],
      site,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await listSites();
  const paths = sites?.map((site) => ({ params: { site: [site.id] } })) ?? [];

  return {
    paths,
    fallback: true,
  };
}

export default SiteFeedback;
