import { Table, Tr, Th } from "@/components/Table";
import { useAuth } from "@/lib/auth";
import FeedbackRow from "@/components/FeedbackRow";

const FeedbackTable = ({ allFeedback }) => {
  const { user } = useAuth();

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>

      <tbody>
        {allFeedback.map((feedback) => (
          <FeedbackRow key={feedback.id} user={user} feedback={feedback} />
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
