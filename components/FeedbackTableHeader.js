import { Fragment } from "react";
import NextLink from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from "@chakra-ui/react";

const FeedbackTableHeader = ({ siteName, nested = false }) => {
  return (
    <Fragment>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage={!nested}>
          {nested ? (
            <NextLink href="/feedback" passHref>
              <BreadcrumbLink color="gray.700" fontSize="sm">
                Feedback
              </BreadcrumbLink>
            </NextLink>
          ) : (
            <BreadcrumbLink color="gray.700" fontSize="sm">
              Feedback
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* 2nd level breadcrumb item */}
        {nested && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="gray.700" fontSize="sm">
              {siteName || "-"}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      <Flex justify="space-between">
        <Heading mb={8}>{siteName || "-"}</Heading>
      </Flex>
    </Fragment>
  );
};

export default FeedbackTableHeader;
