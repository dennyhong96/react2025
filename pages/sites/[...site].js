import { useRef } from "react";
import { Box, FormControl, Textarea, Button } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { createFeedback } from "@/lib/db";
import { getSite, listFeedback, listSites } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";
import DashboardShell from "@/components/DashboardShell";
import SiteHeader from "@/components/SiteHeader";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import useInitialSWR from "@/hooks/useInitialSWR";

const SiteFeedback = ({ initialFeedback, initialSite }) => {
  const router = useRouter();
  const [siteId, route] = router.query.site ?? []; // router.query is empty on ServerRouter at first
  const swrKey = route ? `/api/feedback/${siteId}/${route}` : `/api/feedback/${siteId}`;
  const { data, mutate } = useInitialSWR(swrKey, fetcher, {
    initialData: {
      feedback: initialFeedback,
      site: initialSite,
    },
  });
  const { user } = useAuth();
  const inputRef = useRef();

  console.log("site", data);

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      const newFeedback = {
        author: user.name,
        authorId: user.uid,
        provider: user.provider,
        siteId,
        ...(route && { route }),
        rating: 1,
        text: inputRef.current.value,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      const { id } = createFeedback(newFeedback);

      mutate({ ...data, feedback: [{ id, ...newFeedback }, ...data.feedback] }, false);

      inputRef.current.value = "";
    } catch (error) {
      console.error(error.message);
    }
  };

  return !router.isFallback && data && user ? (
    <DashboardShell>
      <SiteHeader
        swrKey={swrKey}
        isSiteOwner={data.site.authorId === user.uid}
        site={data.site}
        siteId={siteId}
        route={route}
      />

      <Box display="flex" mx={4} flexDirection="column" width="full" maxWidth="700px">
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl mb={8}>
            <Textarea
              background="#fff"
              ref={inputRef}
              id="comment"
              placeholder="Leave a comment"
              isDisabled={!user}
              h="100px"
            />
            {/* {!loading && <LoginOrLeaveFeedback />} */}
            <Button type="submit">Submit</Button>
          </FormControl>
        </Box>

        {/* Feedback */}
        {data?.feedback?.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </DashboardShell>
  ) : null;
};

export async function getStaticProps({ params }) {
  const [siteId, route] = params.site;
  const dbPromises = [listFeedback(siteId, route), getSite(siteId)];
  const [{ siteFeedback: feedback }, { site }] = await Promise.all(dbPromises);

  return {
    props: {
      initialFeedback: feedback ?? [],
      initialSite: site,
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
