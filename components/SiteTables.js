import NextLink from "next/link";
import { Box, Link } from "@chakra-ui/react";

import useDateFormat from "@/hooks/useDateFormat";
import RemoveSiteButton from "./RemoveSiteButton";
import { Table, Tr, Th, Td } from "./Table";

const SiteTable = ({ sites }) => {
  const { format } = useDateFormat();

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th width="50px">{""}</Th>
        </Tr>
      </thead>

      <tbody>
        {sites.map((site) => (
          <Box as="tr" key={site.id}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td>
              <Link href={site.url} isExternal>
                {site.url}
              </Link>
            </Td>
            <Td>
              <NextLink href={`/sites/${site.id}`} passHref>
                <Link color="blue.500" fontWeight="medium">
                  View Feedback
                </Link>
              </NextLink>
            </Td>
            <Td>{format(site.createdAt)}</Td>
            <Td>
              <RemoveSiteButton siteId={site.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
