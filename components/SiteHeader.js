import NextLink from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Box } from "@chakra-ui/react";

import EditSiteModal from "./EditSiteModal";

const SiteHeader = ({ site, siteId, route, swrKey }) => {
  const siteName = site?.name;

  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextLink href="/sites" passHref>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage={!route}>
          {!route ? (
            <BreadcrumbLink>{siteName || "-"}</BreadcrumbLink>
          ) : (
            <NextLink href={`/sites/${siteId}`} passHref>
              <BreadcrumbLink>{siteName || "-"}</BreadcrumbLink>
            </NextLink>
          )}
        </BreadcrumbItem>

        {/* If nested route */}
        {siteName && route && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{route}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      <Flex justifyContent="space-between">
        <Heading mb={8}>{siteName || "-"}</Heading>
        <EditSiteModal site={site} swrKey={swrKey}>{`Edit Site`}</EditSiteModal>
      </Flex>
    </Box>
  );
};

export default SiteHeader;
