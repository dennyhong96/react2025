import { Heading, Text, Flex } from "@chakra-ui/react";
import AddSiteModal from "./AddSiteModal";

import DashboardShell from "./DashboardShell";

const EmptyState = () => {
  return (
    <DashboardShell>
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
          You haven't added any sites.
        </Heading>

        <Text mb={4}>Welcome 👋 Let's get started.</Text>

        <AddSiteModal />
      </Flex>
    </DashboardShell>
  );
};

export default EmptyState;
