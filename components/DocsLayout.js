import { Fragment } from "react";
import { Box } from "@chakra-ui/react";

import Navbar from "./Navbar";
import Footer from "./Footer";

const DocsLayout = ({ children }) => (
  <Fragment>
    <Navbar />
    <Box maxW="650px" mx="auto" px={8} w="100%" wordBreak="break-all">
      {children}
    </Box>
    <Footer />
  </Fragment>
);

export default DocsLayout;
