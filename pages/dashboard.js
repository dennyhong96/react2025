import EmptyState from "@/components/EmptyState";
import { useAuth } from "@/lib/auth";

const dashboard = () => {
  const { user } = useAuth();

  if (!user) return "Loading...";

  return <EmptyState />;
};

export default dashboard;
