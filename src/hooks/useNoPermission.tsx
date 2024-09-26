import { useToast } from "@chakra-ui/react";

export const useNoPermission = () => {
  const toast = useToast();

  const noPermission = () => {
    toast({
      title: "Access denied!",
      description: "You must be logged in to perform this action.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  return noPermission;
};
