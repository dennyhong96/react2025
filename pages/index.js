import Head from "next/head";
import { Button, Flex } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/icons";

export default function Home() {
  const { user, signinWithGithub, signout } = useAuth();
  return (
    <Flex as="main" direction="column" align="center" justify="center" h="100vh">
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <Logo color="black" boxSize={12} />

      {!user && (
        <Button mt={4} size="sm" onClick={signinWithGithub}>
          Sign In
        </Button>
      )}

      {user && <Button onClick={signout}>Sign Out</Button>}
    </Flex>
  );
}
