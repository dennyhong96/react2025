import { Flex, Link, Stack, Avatar, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { useAuth } from "@/lib/auth";
import { Logo } from "./icons";
import { Fragment } from "react";

const DashboardShell = ({ children, title }) => {
  const { user, signout } = useAuth();
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}${router.pathname}`;
  const defaultTitle = `${process.env.NEXT_PUBLIC_APP_NAME} | ${router.pathname
    .slice(1)
    .slice(0, 1)
    .toUpperCase()}${router.pathname.slice(1).slice(1)}`;

  return (
    <Fragment>
      <NextSeo
        title={title ?? defaultTitle}
        canonical={url}
        openGraph={{ url, title: title ?? defaultTitle }}
      />

      <Flex flexDirection="column" height="100vh">
        {/* Navbar */}
        <Flex
          justifyContent="space-between"
          backgroundColor="white"
          alignItems="center"
          py={4}
          px={8}
        >
          <Stack spacing={4} isInline align="center">
            <Logo color="black" boxSize={6} />
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>

            <NextLink href="/sites" passHref>
              <Link>Sites</Link>
            </NextLink>
          </Stack>

          <Flex align="center">
            {/* <Link mr={4}>Account</Link> */}
            <Button onClick={signout} variant="ghost" mr={2}>
              Log out
            </Button>
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>

        {/* Shell */}
        <Flex backgroundColor="gray.100" p={8} flex={1}>
          <Flex direction="column" maxWidth="800px" w="100%" ml="auto" mr="auto">
            {/* Children View */}
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default DashboardShell;
