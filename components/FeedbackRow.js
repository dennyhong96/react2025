import { Box, Code, Switch } from "@chakra-ui/react";
import { mutate } from "swr";

import { Th, Td } from "@/components/Table";
import RemoveFeedbackButton from "@/components/RemoveFeedbackButton";
import { updateFeedbackStatus } from "@/lib/db";

const FeedbackRow = ({ user, feedback }) => {
  const mutateFeedbackCache = (feedbackId, status) => {
    mutate(
      ["/api/feedback", user.token],
      (cachedData) => ({
        feedback: cachedData.feedback.map((fb) => (fb.id === feedbackId ? { ...fb, status } : fb)),
      }),
      false
    );
  };

  const handleUpdateStatus = async (evt, feedbackId) => {
    const oldStatus = !evt.target.checked ? "active" : "pending";
    const newStatus = evt.target.checked ? "active" : "pending";
    try {
      mutateFeedbackCache(feedbackId, newStatus); // Local mutation
      await updateFeedbackStatus({ feedbackId, status: newStatus });
    } catch (error) {
      console.error("handleUpdateStatus ERROR", error);
    }
    mutate(["/api/feedback", user.token]); // Sync with DB
  };

  return (
    <Box as="tr">
      <Td fontWeight="medium">{feedback.author}</Td>
      <Td>{feedback.text}</Td>
      <Td>
        <Code
          maxW="150px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          display="inherit"
        >
          {feedback.route ? `/${feedback.route}` : "/"}
        </Code>
      </Td>
      <Th>
        <Switch
          isChecked={feedback.status === "active"}
          onChange={(evt) => handleUpdateStatus(evt, feedback.id)}
          colorScheme="green"
        />
      </Th>
      <Td>
        <RemoveFeedbackButton feedbackId={feedback.id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
