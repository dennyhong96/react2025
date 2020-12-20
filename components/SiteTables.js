import NextLink from "next/link";
import { Box, Link } from "@chakra-ui/react";

import useDateFormat from "@/hooks/useDateFormat";
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
          <Th>{""}</Th>
        </Tr>
      </thead>

      <tbody>
        {sites.map((site) => (
          <Box as="tr" key={site.id}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td>{site.url}</Td>
            <Td>
              <NextLink href={`/p/${site.id}`} passHref>
                <Link color="blue.500" fontWeight="medium">
                  View Feedback
                </Link>
              </NextLink>
            </Td>
            <Td>{format(site.createdAt)}</Td>
            <Td>{""}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
