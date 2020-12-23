import useSWR from "swr";

import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import EmptyState from "@/components/EmptyState";
import DashboardShell from "@/components/DashboardShell";
import SiteTables from "@/components/SiteTables";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import SiteTableHeader from "@/components/SiteTableHeader";
import UpgradeEmptyState from "@/components/UpgradeEmptyState";

const Sites = () => {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? ["/api/sites", user?.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader stripeRole={user?.stripeRole} />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (data.sites.length) {
    return (
      <DashboardShell>
        <SiteTableHeader stripeRole={user?.stripeRole} />
        <SiteTables sites={data.sites} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader stripeRole={user?.stripeRole} />
      {user?.stripeRole ? <EmptyState /> : <UpgradeEmptyState user={user} />}
    </DashboardShell>
  );
};

export default Sites;
