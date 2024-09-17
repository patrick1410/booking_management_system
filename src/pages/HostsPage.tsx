import { useContext } from "react";
import { DataContext } from "../components/DataProvider";
import {
  Box,
  Card,
  CardBody,
  Text,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";

export const HostsPage = () => {
  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.hosts.length === 0) {
    return <div>Loading...</div>;
  }

  const { hosts } = dataContext;

  return (
    <Box style={{ gridArea: "main", overflow: "auto" }}>
      <Heading as="h2">Hosts Page</Heading>
      <SimpleGrid columns={1} gap={8}>
        {hosts.map((host) => (
          <Card key={host.id}>
            <CardBody>
              <Text>id: {host.id}</Text>
              <Text>username: {host.username}</Text>
              <Text>password: {host.password}</Text>
              <Text>name: {host.name}</Text>
              <Text>email: {host.email}</Text>
              <Text>phoneNumber: {host.phoneNumber}</Text>
              <Text>profilePicture: {host.profilePicture}</Text>
              <Text>aboutMe: {host.aboutMe}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
