import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  Icon,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { BiShow, BiHide } from "react-icons/bi";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { getJWT } from "../../utils/getJWT";
import { useNoPermission } from "../../hooks/useNoPermission";

type EditHostProps = {
  id: string;
  hosts: Host[];
  setHosts: (hosts: Host[]) => void;
};

type FormProps = Host;

export const EditHost: React.FC<EditHostProps> = ({ id, hosts, setHosts }) => {
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

  // Find the host by id
  const host = hosts.find((host) => host.id === id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      username: host?.username,
      password: host?.password,
      name: host?.name,
      email: host?.email,
      phoneNumber: host?.phoneNumber,
      profilePicture: host?.profilePicture,
      aboutMe: host?.aboutMe,
    },
  });

  const [show, setShow] = useState<boolean>(false);

  const editHost = async (host: FormProps) => {
    try {
      const response = await fetch(
        `https://booking-api-vtw8.onrender.com/hosts/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...host,
          }),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `${token}`,
          },
        }
      );

      // Get the updated host from the response
      const updatedHost = await response.json();

      if (updatedHost) {
        // Fetch all hosts after the update
        const refresh = await fetch(
          `https://booking-api-vtw8.onrender.com/hosts`
        );
        const newHosts = await refresh.json();

        // Update the hosts state
        setHosts(newHosts);
        toast({
          title: "Host updated",
          description: "Host has been successfully updated!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={token ? onOpen : noPermission}>Edit Host</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Host</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="form">
              <FormLabel htmlFor="username">Username:</FormLabel>
              <Input
                type="text"
                id="username"
                placeholder="Enter an username..."
                {...register("username", { required: true })}
              />
              <FormLabel htmlFor="password">Password:</FormLabel>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  autoComplete="off"
                  id="password"
                  placeholder="Enter a password..."
                  pr="2rem"
                  {...register("password", { required: true })}
                />
                <InputRightElement
                  cursor="pointer"
                  onClick={() => setShow(!show)}
                  children={<Icon boxSize={6} as={!show ? BiShow : BiHide} />}
                />
              </InputGroup>
              <FormLabel htmlFor="name">Name:</FormLabel>
              <Input
                type="text"
                id="name"
                placeholder="Enter a name..."
                {...register("name", { required: true })}
              />

              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="Enter an email..."
                {...register("email", { required: true })}
              />

              <FormLabel htmlFor="phoneNumber">Phone Number:</FormLabel>
              <Input
                type="tel"
                id="phoneNumber"
                placeholder="Enter a phone number..."
                {...register("phoneNumber", { required: true })}
              />
              <FormLabel htmlFor="profilePicture">Profile Picture:</FormLabel>
              <Input
                type="url"
                id="profilePicture"
                placeholder="Enter an URL..."
                {...register("profilePicture", { required: true })}
              />
              <FormLabel htmlFor="aboutMe">About Me:</FormLabel>
              <Textarea
                id="aboutMe"
                placeholder="Describe yourself..."
                {...register("aboutMe", { required: true })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit(editHost)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
