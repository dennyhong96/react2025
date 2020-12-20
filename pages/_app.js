import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";

import { AuthProvider } from "@/lib/auth";
import theme from "@/styles/theme";

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
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
