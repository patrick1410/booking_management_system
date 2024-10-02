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

type EditUserProps = {
  id: string;
  users: User[];
  setUsers: (users: User[]) => void;
};

type FormProps = User;

export const EditUser: React.FC<EditUserProps> = ({ id, users, setUsers }) => {
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

  // Find the user by id
  const user = users.find((user) => user.id === id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      username: user?.username,
      password: user?.password,
      name: user?.name,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      profilePicture: user?.profilePicture,
    },
  });

  const [show, setShow] = useState<boolean>(false);

  const editUser = async (user: FormProps) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...user,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `${token}`,
        },
      });

      // Get the updated user from the response
      const updatedUser = await response.json();

      if (updatedUser) {
        // Fetch all users after the update
        const refresh = await fetch(`http://localhost:3000/users`);
        const newUsers = await refresh.json();

        // Update the users state
        setUsers(newUsers);
        toast({
          title: "User updated",
          description: "User has been successfully updated!",
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
      <Button onClick={token ? onOpen : noPermission}>Edit User</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
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
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit(editUser)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
