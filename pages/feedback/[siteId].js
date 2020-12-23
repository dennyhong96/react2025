import useSWR from "swr";
import { useRouter } from "next/router";

import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import EmptyState from "@/components/EmptyState";
import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackTableHeader from "@/components/FeedbackTableHeader";

const SiteFeedback = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data, error } = useSWR(
    user ? [`/api/feedback/${router.query.siteId}`, user.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title={`${data.site.name} feedback`}>
      <FeedbackTableHeader siteName={data.site.name} nested={true} />
      {!data.feedback?.length ? <EmptyState /> : <FeedbackTable allFeedback={data.feedback} />}
    </DashboardShell>
  );
};

export default SiteFeedback;
