import { Fragment, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import { mutate } from "swr";
import { useForm } from "react-hook-form";

import { createSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";

const AddSiteModal = ({ children = "Add Your First Site" }) => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();
  const toast = useToast();

  const { register, handleSubmit } = useForm();
  const handleCreateSite = async (formData) => {
    // Adds new site to DB and gets auto generated ID from DB
    const newSiteData = {
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      ...formData,
    };
    const { id } = createSite(newSiteData);

    // Close the modal
    onClose();

    // Displays a toast
    toast({
      title: "Success!",
      description: "We've added your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Mutates cache of all SWRs with key `/api/sites`
    mutate(
      ["/api/sites", user.token],
      (cachedData) => ({
        sites: [{ id, ...newSiteData }, ...cachedData.sites],
      }),
      false // Whether refetch from api to overwrite cache or not
    );
  };

  return (
    <Fragment>
      {/* Add site button */}
      <Button
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
        ref={finalRef}
        onClick={onOpen}
      >
        {children}
      </Button>

      {/* Modal */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Site name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="My site"
                name="name"
                ref={register({ required: true })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Site Url</FormLabel>
              <Input
                placeholder="https://website.com"
                name="url"
                ref={register({ required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="button" onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button type="submit" backgroundColor="#99FFEE" color="#194D4C">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default AddSiteModal;
