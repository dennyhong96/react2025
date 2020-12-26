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

import { deleteSite } from "@/lib/db";
import { mutate } from "swr";
import { useAuth } from "@/lib/auth";

const RemoveSiteButton = ({ siteId }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);

  const handleDeleteSite = async () => {
    // Optmistic UI
    mutate(
      ["/api/sites", user.token],
      (cachedData) => ({
        ...cachedData,
        sites: cachedData.sites.filter((site) => site.id !== siteId),
      }),
      false
    );

    onClose();

    await deleteSite(siteId);

    mutate(["/api/sites", user.token]); // Sync with DB
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
              Remove Site
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will delete the site and all of the feeback left on it.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" fontWeight="bold" onClick={handleDeleteSite} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  );
};

export default RemoveSiteButton;
