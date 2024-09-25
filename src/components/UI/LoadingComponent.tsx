import { Box, Text, Spinner } from "@chakra-ui/react";

type LoadingComponentProps = {
  resource: string;
};

export const LoadingComponent: React.FC<LoadingComponentProps> = ({
  resource,
}) => {
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
      <Text>Loading {resource}...</Text>
    </Box>
  );
};
