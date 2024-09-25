import { Box, Text, Spinner } from "@chakra-ui/react";

export const LoadingComponent = () => {
  return (
    <Box
      position="absolute"
      transform="translate(-50%, -50%)"
      top="50%"
      left="50%"
      textAlign="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text>Loading data...</Text>
    </Box>
  );
};
