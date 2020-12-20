import { useAuth } from "@/lib/auth";
import {
  Flex,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/react";
import AddSiteModal from "./AddSiteModal";
import { Logo } from "./icons";

const DashboardShell = ({ children }) => {
  const { user } = useAuth();

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
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>

        <Flex>
          <Link mr={4}>Account</Link>
          <Avatar size="sm" src={user?.photoUrl} />
        </Flex>
      </Flex>

      {/* Shell */}
      <Flex backgroundColor="gray.100" p={8} flex={1}>
        <Flex direction="column" maxWidth="800px" w="100%" ml="auto" mr="auto">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink color="gray.700" fontSize="sm">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Flex justify="space-between">
            <Heading mb={8}>My Sites</Heading>
            <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>

          {/* Children View */}
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
