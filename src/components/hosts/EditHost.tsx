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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { DataContext } from "../DataProvider";

type EditHostProps = {
  id: string; // The id of the host being edited
};

type FormProps = Host; // FormProps is set to Host type

export const EditHost: React.FC<EditHostProps> = ({ id }) => {
  const dataContext = useContext(DataContext);
  const { hosts = [], setHosts = () => {} } = dataContext || {}; // Default to empty array and noop function

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

  const editHost = async (host: FormProps) => {
    try {
      const response = await fetch(`http://localhost:3000/hosts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...host,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      const updatedHost = await response.json();

      if (setHosts) {
        setHosts(
          hosts.map((host) => (host.id === updatedHost.id ? updatedHost : host))
        );
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Edit Host</Button>

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
              <Input
                type="password"
                autoComplete="off"
                id="password"
                placeholder="Enter a password..."
                {...register("password", { required: true })}
              />
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
