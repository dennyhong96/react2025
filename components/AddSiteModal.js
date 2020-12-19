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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { createSite } from "@/lib/db";

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();

  const { register, handleSubmit, watch, errors } = useForm();
  const handleCreateSite = (data) => createSite(data);

  return (
    <Fragment>
      {/* Add site button */}
      <Button
        ref={finalRef}
        onClick={onOpen}
        variant="solid"
        size="md"
        maxW="200px"
        fontWeight="medium"
      >
        Add your first site
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
