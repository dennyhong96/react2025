import Head from "next/head";
import { Button, Flex, Stack } from "@chakra-ui/react";
import NextLink from "next/link";

import { useAuth } from "@/lib/auth";
import { Github, Google, Logo } from "@/components/icons";
import { getSite, listFeedbackBySite } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";

export default function Home({ allFeedback, site }) {
  const { user, signinWithGithub, signinWithGoogle } = useAuth();

  return (
    <Flex as="main" direction="column" align="center" justify="center" pt={16}>
      <Head>
        {/* Redirect authenticated user */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('AUTHENTICATED')) {
            window.location.href = "/sites"
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
        <NextLink href="/sites" passHref>
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

      <Flex direction="column" align="stretch" w="90%" maxW="800px" mt={16}>
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} settings={site.settings} />
        ))}
      </Flex>
    </Flex>
  );
}

export const getStaticProps = async () => {
  const myDemoSiteId = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;
  const { feedback } = await listFeedbackBySite(myDemoSiteId);
  const { site } = await getSite(myDemoSiteId);
  return {
    props: { allFeedback: feedback ?? [], site },
    revalidate: 1,
  };
};
