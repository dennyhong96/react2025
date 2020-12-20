import { Box, Heading, Text, Divider } from "@chakra-ui/react";

import useDateFormat from "hooks/useDateFormat";

const Feedback = ({ author, text, createdAt }) => {
  const { format } = useDateFormat();

  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Heading as="h3" size="sm" mb={0} color="gray.900" fontWeight="medium">
        {author}
      </Heading>

      <Text color="gray.500" mb={4} fontSize="xs">
        {format(createdAt)}
      </Text>

      <Text color="gray.800">{text}</Text>

      <Divider borderColor="gray.200" backgroundColor="gray.200" mt={8} mb={8} />
    </Box>
  );
};

export default Feedback;
