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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { DataContext } from "../DataProvider";

type CreateUserProps = {
  title: string;
};

type FormProps = {
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
};

export const CreateUser: React.FC<CreateUserProps> = ({ title }) => {
  const dataContext = useContext(DataContext);
  const { users = [], setUsers = () => {} } = dataContext || {}; // Default to empty array and noop function

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormProps>({});

  const createUser = async (user: FormProps) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify({
          ...user,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      const newUser = await response.json();
      if (setUsers) {
        setUsers([newUser, ...users]);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>{title}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create User</ModalHeader>
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

              <FormLabel htmlFor="password">Password:</FormLabel>
              <Input
                type="password"
                autoComplete="off"
                id="password"
                placeholder="Enter a password..."
                {...register("password", { required: true })}
              />

              <FormLabel htmlFor="profilePicture">Profile Picture:</FormLabel>
              <Input
                type="url"
                id="profilePicture"
                placeholder="Enter an URL..."
                {...register("profilePicture", { required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit(createUser)} variant="ghost">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
