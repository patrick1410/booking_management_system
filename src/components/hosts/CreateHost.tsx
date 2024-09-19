import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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

type FormProps = {
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  aboutMe: string;
};

export const CreateHost = () => {
  const dataContext = useContext(DataContext);
  const { hosts = [], setHosts = () => {} } = dataContext || {}; // Default to empty array and noop function

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormProps>({});
  const [show, setShow] = useState<boolean>(false);

  const createHost = async (host: FormProps) => {
    try {
      const response = await fetch("http://localhost:3000/hosts", {
        method: "POST",
        body: JSON.stringify({
          ...host,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      const newHost = await response.json();
      if (setHosts) {
        setHosts([newHost, ...hosts]);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Create Host</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Host</ModalHeader>
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
            <Button onClick={handleSubmit(createHost)} variant="ghost">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
