import { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from "@chakra-ui/react";

import AddSiteModal from "./AddSiteModal";

const SiteTableHeader = ({ stripeRole }) => {
  return (
    <Fragment>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.700" fontSize="sm">
            Sites
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex justify="space-between">
        <Heading mb={8}>My Sites</Heading>
        {stripeRole && <AddSiteModal>+ Add Site</AddSiteModal>}
      </Flex>
    </Fragment>
  );
};

export default SiteTableHeader;
