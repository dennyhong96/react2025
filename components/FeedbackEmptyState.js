import { Heading, Text, Flex } from "@chakra-ui/react";

const FeedbackEmptyState = () => {
  return (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      direction="column"
      justify="center"
      align="center"
    >
      <Heading size="lg" mb={2}>
        There isn't any feedback yet.
      </Heading>

      <Text mb={4}>Share your site! 🔗</Text>
    </Flex>
  );
};

export default FeedbackEmptyState;
