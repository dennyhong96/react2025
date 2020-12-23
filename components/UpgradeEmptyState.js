import { useState } from "react";
import { Heading, Text, Flex, Button } from "@chakra-ui/react";

import { createCheckoutSession } from "@/lib/db";

const UpgradeEmptyState = ({ user }) => {
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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
        Get feedback on your site instantly.
      </Heading>

      <Text mb={4}>Start today, then grow with us 🌱</Text>

      <Button
        onClick={() => {
          setCheckoutLoading(true);
          createCheckoutSession(user.uid);
        }}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        ml={4}
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
        isLoading={checkoutLoading}
      >
        Upgrate to Starter
      </Button>
    </Flex>
  );
};

export default UpgradeEmptyState;
