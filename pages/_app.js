import { Fragment } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { NextSeo } from "next-seo";
import { MDXProvider } from "@mdx-js/react";

import { AuthProvider } from "@/lib/auth";
import theme from "@/styles/theme";
import SEO_DEFAULT from "../next-seo.config";
import useNProgress from "@/hooks/useNProgress";
import MDXComponents from "@/components/MDXComponents";

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        html {
          min-width: 360px;
          scroll-behavior: smooth;
        }

        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #edf2f7;
        }
      `}
    />
  );
};

function MyApp({ Component, pageProps }) {
  useNProgress();

  return (
    <Fragment>
      <NextSeo {...SEO_DEFAULT} />
      <MDXProvider components={MDXComponents}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </AuthProvider>
        </ChakraProvider>
      </MDXProvider>
    </Fragment>
  );
}

export default MyApp;
