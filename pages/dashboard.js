import useSWR from "swr";

import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import SiteTables from "@/components/SiteTables";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";

const dashboard = () => {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? ["/api/sites", user.token] : null, fetcher);

  console.log("/api/sites data", data);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {!data.sites?.length ? <EmptyState /> : <SiteTables sites={data.sites} />}
    </DashboardShell>
  );
};

export default dashboard;
