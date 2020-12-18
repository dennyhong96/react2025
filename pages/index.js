import Head from "next/head";
import { Button, Code, Heading, Text } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";

export default function Home() {
  const { user, signinWithGithub, signout } = useAuth();
  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <main>
        <Heading>Fast Feedback</Heading>

        <Text>
          Current user: <Code>{user?.email}</Code>
        </Text>

        {!user && <Button onClick={signinWithGithub}>Sign In</Button>}
        {user && <Button onClick={signout}>Sign Out</Button>}
      </main>

      <footer></footer>
    </div>
  );
}
