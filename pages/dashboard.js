import useSWR from "swr";

import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import EmptyState from "@/components/EmptyState";
import DashboardShell from "@/components/DashboardShell";
import SiteTables from "@/components/SiteTables";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";

import SiteTableHeader from "@/components/SiteTableHeader";

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

  return (
    <DashboardShell>
      <SiteTableHeader />
      {!data.sites?.length ? <EmptyState /> : <SiteTables sites={data.sites} />}
    </DashboardShell>
  );
};

export default Dashboard;
