import { Box, Link } from "@chakra-ui/react";
import { useRef } from "react";

import { Table, Tr, Th, Td } from "./Table";

const SiteTable = ({ sites }) => {
  const intlRef = useRef((date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);
  });

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
              <Link>View Feedback</Link>
            </Td>
            <Td>{intlRef.current(new Date(site.createdAt))}</Td>
            <Td>{""}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
