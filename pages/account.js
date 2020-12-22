import { Button, Box } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import SiteTableHeader from "@/components/SiteTableHeader";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import { createCheckoutSession } from "@/lib/db";

export default function Account({}) {
  const { user, signinWithGithub, signinWithGoogle } = useAuth();

  if (!user) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Box>
        <Button
          onClick={createCheckoutSession.bind(this, user.uid)}
          mt={4}
          size="lg"
          backgroundColor="white"
          color="gray.900"
          variant="outline"
          fontWeight="medium"
          _hover={{ bg: "gray.100" }}
          _active={{
            bg: "gray.100",
            transform: "scale(0.95)",
          }}
        >
          Upgrade to starter
        </Button>
      </Box>
    </DashboardShell>
  );
}
