import useSWR from "swr";

import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import EmptyState from "@/components/EmptyState";
import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackTableHeader from "@/components/FeedbackTableHeader";

const MyFeedback = () => {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? ["/api/feedback", user.token] : null, fetcher);

  console.log("/api/feedback data", data);

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {!data.feedback?.length ? <EmptyState /> : <FeedbackTable allFeedback={data.feedback} />}
    </DashboardShell>
  );
};

export default MyFeedback;
