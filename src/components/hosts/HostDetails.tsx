import { Box, Avatar, Text, Heading } from "@chakra-ui/react";

type HostDetailsProps = {
  host: Host;
};

export const HostDetails: React.FC<HostDetailsProps> = ({ host }) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Avatar src={host.profilePicture} name={host.name} />
        <Heading ml="0.5rem" as="h3">
          {host.name}'s Details:
        </Heading>
      </Box>

      <Box mb={"0.75rem"}>
        <Text>
          <strong>id: </strong>
          {host.id}
        </Text>
        <Text>
          <strong>username: </strong>
          {host.username}
        </Text>
        <Text>
          <strong>email: </strong>
          {host.email}
        </Text>
        <Text>
          <strong>phone: </strong>
          {host.phoneNumber}
        </Text>
        <Text>
          <strong>about: </strong>
          {host.aboutMe}
        </Text>
      </Box>
    </>
  );
};
