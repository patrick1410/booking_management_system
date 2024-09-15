import { Box, Text, Link, Icon } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box
      gridArea="footer"
      as="footer"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text>
        &copy;2024 Made by{" "}
        <Link
          _hover={{ textDecoration: "none" }}
          href="https://www.linkedin.com/in/patrick-mankaryous/"
          isExternal
        >
          Patrick Mankaryous{" "}
        </Link>
        with passion and fun!
      </Text>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Link href="https://github.com/patrick1410" isExternal>
          <Icon className="github-icon" as={FaGithub} />
        </Link>
        <Link href="https://www.linkedin.com/in/patrick-mankaryous/" isExternal>
          <Icon className="linkedin-icon" as={FaLinkedin} />
        </Link>
      </Box>
    </Box>
  );
};
