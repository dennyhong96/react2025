import Head from "next/head";
import { Button, Flex, Stack } from "@chakra-ui/react";
import NextLink from "next/link";

import { useAuth } from "@/lib/auth";
import { Github, Google, Logo } from "@/components/icons";
import { listFeedbackBySite } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";

export default function Home({ allFeedback }) {
  const { user, signinWithGithub, signinWithGoogle } = useAuth();

  return (
    <Flex as="main" direction="column" align="center" justify="center" h="100vh">
      <Head>
        <title>Fast Feedback</title>

        {/* Redirect authenticated user */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('AUTHENTICATED')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
      </Head>

      <Logo color="black" boxSize={24} />

      {/* User not logged in */}
      {!user && (
        <Stack>
          <Button
            onClick={signinWithGithub}
            leftIcon={<Github />}
            mt={4}
            size="lg"
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: "gray.700" }}
            _active={{
              bg: "gray.800",
              transform: "scale(0.95)",
            }}
          >
            Sign In with Github
          </Button>

          <Button
            onClick={signinWithGoogle}
            leftIcon={<Google />}
            mt={4}
            size="lg"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            _hover={{ bg: "gray.100" }}
            _active={{
              bg: "gray.100",
              transform: "scale(0.95)",
            }}
          >
            Sign In with Google
          </Button>
        </Stack>
      )}

      {/* User logged in */}
      {user && (
        <NextLink href="/dashboard" passHref>
          <Button
            as="a"
            mt={4}
            size="lg"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            _hover={{ bg: "gray.100" }}
            _active={{
              bg: "gray.100",
              transform: "scale(0.95)",
            }}
          >
            View Dashboard
          </Button>
        </NextLink>
      )}

      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Flex>
  );
}

export const getStaticProps = async () => {
  const myDemoSiteId = "1pZLo9KTYreZzYBd3ikp";
  const { feedback } = await listFeedbackBySite(myDemoSiteId);
  return {
    props: { allFeedback: feedback ?? [] },
    revalidate: 1,
  };
};
