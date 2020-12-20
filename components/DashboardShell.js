import { Flex, Link, Stack, Avatar, Button } from "@chakra-ui/react";
import NextLink from "next/link";

import { useAuth } from "@/lib/auth";
import { Logo } from "./icons";

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <Flex flexDirection="column" height="100vh">
      {/* Navbar */}
      <Flex
        justifyContent="space-between"
        backgroundColor="white"
        alignItems="center"
        py={4}
        px={8}
      >
        <Stack spacing={4} isInline align="center">
          <Logo color="black" boxSize={6} />
          <NextLink href="/feedback" passHref>
            <Link>Feedback</Link>
          </NextLink>

          <NextLink href="/dashboard" passHref>
            <Link>Sites</Link>
          </NextLink>
        </Stack>

        <Flex align="center">
          {/* <Link mr={4}>Account</Link> */}
          <Button onClick={signout} variant="ghost" mr={2}>
            Log out
          </Button>
          <Avatar size="sm" src={user?.photoUrl} />
        </Flex>
      </Flex>

      {/* Shell */}
      <Flex backgroundColor="gray.100" p={8} flex={1}>
        <Flex direction="column" maxWidth="800px" w="100%" ml="auto" mr="auto">
          {/* Children View */}
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
