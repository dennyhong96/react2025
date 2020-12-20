import { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from "@chakra-ui/react";

const FeedbackTableHeader = () => {
  return (
    <Fragment>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color="gray.700" fontSize="sm">
            Feedback
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex justify="space-between">
        <Heading mb={8}>My Feedback</Heading>
      </Flex>
    </Fragment>
  );
};

export default FeedbackTableHeader;
