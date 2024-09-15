import { Box, Heading } from "@chakra-ui/react";

type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box
      gridArea="header"
      as="header"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="3xl" textAlign="center">
        {title}
      </Heading>
    </Box>
  );
};
