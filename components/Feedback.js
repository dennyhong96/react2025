import { useRouter } from "next/router";
import { Box, Heading, Text, Divider } from "@chakra-ui/react";

import useDateFormat from "@/hooks/useDateFormat";
import { Github, Google } from "./icons";

const logos = {
  "google.com": <Google />,
  "github.com": <Github />,
};

const Feedback = ({ author, provider, text, createdAt, settings }) => {
  const { format } = useDateFormat();
  const { query } = useRouter();
  const colorMode = query.theme ?? "light";
  const authorColor = {
    light: "gray.900",
    dark: "gray.200",
  };
  const textColor = {
    light: "gray.800",
    dark: "gray.300",
  };
  const dividerColor = {
    light: "gray.200",
    dark: "gray.700",
  };

  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Heading as="h3" size="sm" mb={0} fontWeight="medium" color={authorColor[colorMode]}>
        {author} {settings?.showIcons && logos[provider]}
      </Heading>

      {settings?.showTimestamps && (
        <Text color={textColor[colorMode]} mb={4} fontSize="xs">
          {format(createdAt)}
        </Text>
      )}

      <Text color={textColor[colorMode]}>{text}</Text>

      <Divider borderColor={dividerColor[colorMode]} mt={8} mb={8} />
    </Box>
  );
};

export default Feedback;
