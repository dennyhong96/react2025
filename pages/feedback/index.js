import useSWR from "swr";

import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackTableHeader from "@/components/FeedbackTableHeader";
import FeedbackEmptyState from "@/components/FeedbackEmptyState";

const MyFeedback = () => {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? ["/api/feedback", user.token] : null, fetcher);

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
      <FeedbackTableHeader siteName="My Feedback" />
      {!data.feedback?.length ? (
        <FeedbackEmptyState />
      ) : (
        <FeedbackTable allFeedback={data.feedback} />
      )}
    </DashboardShell>
  );
};

export default MyFeedback;
