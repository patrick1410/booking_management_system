import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";

import { login } from "../utils/login";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);

  const onSubmit = async (data: any) => {
    const { username, password } = data;

    const success = await login(username, password);

    if (success) {
      navigate("/"); // Redirect to home
      toast({
        title: "Logged in!",
        description:
          "You've successfully logged in! You can now access and perform authorized operations.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex gridArea="main" justifyContent="center" alignItems="center">
      <FormControl
        as="form"
        w={{ base: "100%", sm: "60%", md: "50%", xl: "40%", "2xl": "20%" }}
        maxW={"400px"}
      >
        <FormLabel mb={2} htmlFor="username" color="#1e3a78">
          Username
        </FormLabel>
        <Input
          id="username"
          type="text"
          _placeholder={{ color: "gray.500" }}
          placeholder="Enter username"
          color="#1e3a78"
          autoComplete="off"
          {...register("username", { required: true })}
        />
        <FormLabel mt={2} mb={2} htmlFor="password" color="#1e3a78">
          Password
        </FormLabel>
        <InputGroup>
          <Input
            id="password"
            type={show ? "text" : "password"}
            _placeholder={{ color: "gray.500" }}
            placeholder="Enter password"
            color="#1e3a78"
            autoComplete="off"
            pr="2rem"
            {...register("password", { required: true })}
          />
          <InputRightElement
            cursor="pointer"
            color={"#1e3a78"}
            onClick={() => setShow(!show)}
            children={<Icon boxSize={6} as={!show ? BiShow : BiHide} />}
          />
        </InputGroup>
        <Flex justifyContent="center">
          <Button type="submit" mt={2} onClick={handleSubmit(onSubmit)}>
            Login
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};
