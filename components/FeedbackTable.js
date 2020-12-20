import { Box, Code, Switch, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { Table, Tr, Th, Td } from "./Table";

const FeedbackTable = ({ allFeedback }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>

      <tbody>
        {allFeedback.map((feedback) => (
          <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>/route</Code>
            </Td>
            <Th>
              <Switch colorScheme="green" defaultChecked={feedback.status === "active"} />
            </Th>
            <Td>
              <IconButton variant="ghost" aria-label="Delete feedback" icon={<DeleteIcon />} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
