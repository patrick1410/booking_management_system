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
} from "@chakra-ui/react";

import { BiShow, BiHide } from "react-icons/bi";

import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
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

  const [show, setShow] = useState<boolean>(false);

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

      // Get the updated host from the response
      const updatedHost = await response.json();

      if (updatedHost) {
        // Fetch all hosts after the update
        const refresh = await fetch(`http://localhost:3000/hosts`);
        const newHosts = await refresh.json();

        // Update the hosts state
        setHosts(newHosts);
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
