import { Box, Code, Switch } from "@chakra-ui/react";
import { mutate } from "swr";

import { Th, Td } from "@/components/Table";
import RemoveButton from "@/components/RemoveButton";
import { updateFeedbackStatus } from "@/lib/db";

const FeedbackRow = ({ user, feedback }) => {
  // Mutation Helper
  const mutateFeedbackCache = (feedbackId, status) => {
    mutate(
      ["/api/feedback", user.token],
      (cachedData) => ({
        feedback: cachedData.feedback.map((fb) => (fb.id === feedbackId ? { ...fb, status } : fb)),
      }),
      false
    );
  };

  // <Switch/> onChange handler
  const handleUpdateStatus = async (evt, feedbackId) => {
    const oldStatus = !evt.target.checked ? "active" : "pending";
    const newStatus = evt.target.checked ? "active" : "pending";
    try {
      // Optmistic UI
      mutateFeedbackCache(feedbackId, newStatus);
      await updateFeedbackStatus({ feedbackId, status: newStatus });
    } catch (error) {
      console.error("handleUpdateStatus ERROR", error);

      // UI Error Rollback
      mutateFeedbackCache(feedbackId, oldStatus);
    }
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
        <RemoveButton feedbackId={feedback.id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
