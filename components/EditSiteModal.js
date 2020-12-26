import { Fragment, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Button,
  useToast,
  Switch,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

import { updateSite } from "@/lib/db";
import useSWR, { cache } from "swr";
import fetcher from "@/utils/fetcher";
import useInitialSWR from "@/hooks/useInitialSWR";

const EditSiteModal = ({ children, site, swrKey }) => {
  const { data, mutate } = useInitialSWR(swrKey, fetcher, { revalidateOnMount: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();
  const toast = useToast();

  const handleChange = async (evt) => {
    try {
      const { name, checked } = evt.target;

      // Local mutation
      mutate(
        {
          ...data,
          site: {
            ...data.site,
            settings: {
              ...data.site.settings,
              [name]: checked,
            },
          },
        },
        false
      );

      await updateSite(site.id, {
        settings: {
          ...site.settings,
          [name]: checked,
        },
      });

      toast({
        description: "Settings updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }

    mutate(); // Sync with DB
  };

  return (
    <Fragment>
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
        leftIcon={<SettingsIcon />}
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
        <ModalContent as="form">
          <ModalHeader fontWeight="bold">Update Site - {site?.name}</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl display="flex" alignItems="center" mb="2">
              <Switch
                isChecked={site.settings.showTimestamps}
                name="showTimestamps"
                onChange={handleChange}
                colorScheme="green"
                id="show-timestamps"
                mr="2"
              />
              <FormLabel htmlFor="show-timestamps" mb="0">
                Show timestampes?
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center" mb="2">
              <Switch
                isChecked={site.settings.showIcons}
                name="showIcons"
                onChange={handleChange}
                colorScheme="green"
                id="show-icons"
                mr="2"
              />
              <FormLabel htmlFor="show-icons" mb="0">
                Show icons?
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center" mb="2">
              <Switch
                isChecked={site.settings.showRatings}
                name="showRatings"
                onChange={handleChange}
                colorScheme="green"
                id="show-ratings"
                mr="2"
              />
              <FormLabel htmlFor="show-ratings" mb="0">
                Show ratings?
              </FormLabel>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default EditSiteModal;
