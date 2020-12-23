import useSWR from "swr";

import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import EmptyState from "@/components/EmptyState";
import DashboardShell from "@/components/DashboardShell";
import SiteTables from "@/components/SiteTables";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import SiteTableHeader from "@/components/SiteTableHeader";
import UpgradeEmptyState from "@/components/UpgradeEmptyState";

const Dashboard = () => {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? ["/api/sites", user.token] : null, fetcher);

  console.log("/api/sites data", data);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (data.sites.length) {
    return <SiteTables sites={data.sites} />;
  }

  return (
    <DashboardShell>
      <SiteTableHeader stripeRole={user.stripeRole} />
      {user.stripeRole ? <EmptyState /> : <UpgradeEmptyState user={user} />}
    </DashboardShell>
  );
};

export default Dashboard;
