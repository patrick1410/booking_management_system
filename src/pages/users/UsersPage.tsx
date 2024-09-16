import { useContext } from "react";
import { DataContext } from "../../components/DataProvider";
import {
  Box,
  Card,
  CardBody,
  Text,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";

export const UsersPage = () => {
  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.users.length === 0) {
    return <div>Loading...</div>;
  }

  const { users } = dataContext;

  return (
    <Box style={{ gridArea: "main", overflow: "auto" }}>
      <Heading as="h2">Users Page</Heading>
      <SimpleGrid columns={1} gap={8}>
        {users.map((user) => (
          <Card key={user.id}>
            <CardBody>
              <Text>id: {user.id}</Text>
              <Text>username: {user.username}</Text>
              <Text>password {user.password}</Text>
              <Text>name: {user.name}</Text>
              <Text>email: {user.email}</Text>
              <Text>phoneNumber: {user.phoneNumber}</Text>
              <Text>profilePicture: {user.profilePicture}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
