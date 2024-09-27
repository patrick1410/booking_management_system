import { Box, Avatar, Text, Heading } from "@chakra-ui/react";

type UserDetailsProps = {
  user: User;
};

export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Avatar src={user.profilePicture} name={user.name} />
        <Heading ml="0.5rem" as="h3">
          {user.name}'s Details:
        </Heading>
      </Box>
      <Box mb={"0.75rem"}>
        <Text>
          <strong>id: </strong>
          {user.id}
        </Text>
        <Text>
          <strong>username: </strong>
          {user.username}
        </Text>
        <Text>
          <strong>password </strong>
          {user.password}
        </Text>
        <Text>
          <strong>email: </strong>
          {user.email}
        </Text>
        <Text>
          <strong>phoneNumber: </strong>
          {user.phoneNumber}
        </Text>
        <Text>
          <strong>profilePicture: </strong>
          {user.profilePicture}
        </Text>
      </Box>
    </>
  );
};
