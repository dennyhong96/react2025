import { NextSeo } from "next-seo";
import { Fragment } from "react";
import { Box, Text } from "@chakra-ui/react";

import { getSite, listFeedback, listSites } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";
import { useRouter } from "next/router";

const SiteFeedback = ({ feedback, site }) => {
  const { query } = useRouter();
  const colorMode = query.theme ?? "light";
  const textColor = {
    light: "gray.900",
    dark: "gray.200",
  };

  return (
    <Fragment>
      <NextSeo title={`Fast Feedback | ${site?.name}`} />
      <Box display="flex" flexDirection="column" w="full">
        {feedback?.length ? (
          feedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} settings={site?.settings} />
          ))
        ) : (
          <Text color={textColor[colorMode]}>There are no comments for this site.</Text>
        )}
      </Box>
    </Fragment>
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
