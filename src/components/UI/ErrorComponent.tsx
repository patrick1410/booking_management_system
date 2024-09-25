import { Box, Text, Link } from "@chakra-ui/react";

type ErrorComponentProps = {
  error: string;
};

export const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  return (
    <Box
      position="absolute"
      transform="translate(-50%, -50%)"
      top="50%"
      left="50%"
      textAlign="center"
    >
      <Box>
        <Text as="h2" fontSize="1.5rem">
          {error}
        </Text>
        <Text>
          Try to{" "}
          <Link _hover={{ textDecoration: "none" }} href="/">
            reload
          </Link>{" "}
          the page
        </Text>
      </Box>
    </Box>
  );
};
