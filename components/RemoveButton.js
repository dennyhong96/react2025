import { useState, Fragment, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteFeedback } from "@/lib/db";
import { mutate } from "swr";
import { useAuth } from "@/lib/auth";

const RemoveButton = ({ feedbackId }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);

  const handleDeleteFeedback = async () => {
    mutate(
      ["/api/feedback", user.token],
      (cachedData) => ({
        feedback: cachedData.feedback.filter((fb) => fb.id !== feedbackId),
      }),
      false
    );

    onClose();

    await deleteFeedback(feedbackId);
  };

  return (
    <Fragment>
      <IconButton
        onClick={setIsOpen.bind(this, true)}
        variant="ghost"
        aria-label="Delete feedback"
        icon={<DeleteIcon />}
      />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteFeedback} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  );
};

export default RemoveButton;
