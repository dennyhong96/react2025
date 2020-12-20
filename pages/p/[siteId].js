import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { createFeedback } from "@/lib/db";
import { listFeedback, listSites } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";

const SiteFeedback = ({ initialFeedback }) => {
  console.log("initialFeedback", initialFeedback);

  const [addFeedback, setAllFeedback] = useState(initialFeedback);
  const router = useRouter();
  const { user } = useAuth();
  const inputRef = useRef();

  console.log(router);

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      const newFeedback = {
        author: user.name,
        authorId: user.uid,
        provider: user.provider,
        siteId: router.query.siteId,
        rating: 1,
        text: inputRef.current.value,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      const { id } = await createFeedback(newFeedback);
      setAllFeedback((prev) => [{ id, ...newFeedback }, ...prev]);
      inputRef.current.value = "";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Box display="flex" flexDirection="column" w="full" maxWidth="700px" margin="0 auto">
      {/* Input Form */}
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl id="comment" my={8}>
          <FormLabel>Comment</FormLabel>
          <Input ref={inputRef} type="text" />
          <Button fontWeight="medium" mt={2} type="submit">
            Add Comment
          </Button>
        </FormControl>
      </Box>

      {/* Feedback */}
      {addFeedback?.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export async function getStaticProps({ params }) {
  const siteId = params.siteId;
  const { siteFeedback: feedback } = await listFeedback(siteId);

  console.log("feedback", feedback);

  return {
    props: {
      initialFeedback: feedback ?? [],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await listSites();
  const paths = sites?.map((site) => ({ params: { siteId: site.id } })) ?? [];

  console.log("paths", paths);

  return {
    paths,
    fallback: true,
  };
}

export default SiteFeedback;
