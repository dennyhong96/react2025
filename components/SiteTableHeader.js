import { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from "@chakra-ui/react";

import AddSiteModal from "./AddSiteModal";

const SiteTableHeader = () => {
  return (
    <Fragment>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color="gray.700" fontSize="sm">
            Sites
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex justify="space-between">
        <Heading mb={8}>My Sites</Heading>
        <AddSiteModal>+ Add Site</AddSiteModal>
      </Flex>
    </Fragment>
  );
};

export default SiteTableHeader;
