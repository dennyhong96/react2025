import { Button, Box } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import SiteTableHeader from "@/components/SiteTableHeader";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import { createCheckoutSession, goToBillingPortal } from "@/lib/db";

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
        {/* Buy starter */}
        <Button
          onClick={createCheckoutSession.bind(this, user.uid)}
          mt={4}
          size="lg"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          _hover={{ bg: "gray.700" }}
          _active={{
            bg: "gray.800",
            transform: "scale(0.95)",
          }}
        >
          Upgrade to starter
        </Button>

        {/* View Billing Portal */}
        <Button
          onClick={goToBillingPortal}
          mt={4}
          size="lg"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          _hover={{ bg: "gray.700" }}
          _active={{
            bg: "gray.800",
            transform: "scale(0.95)",
          }}
        >
          View Billing Portal
        </Button>
      </Box>
    </DashboardShell>
  );
}
