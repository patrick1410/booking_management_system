import { useContext } from "react";
import { DataContext } from "../components/DataProvider";
import {
  Box,
  Card,
  CardBody,
  Text,
  SimpleGrid,
  Heading,
  Button,
} from "@chakra-ui/react";
import { CreateUser } from "../components/users/CreateUser";
import { EditUser } from "../components/users/EditUser";

export const UsersPage = () => {
  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.users.length === 0) {
    return <div>Loading...</div>;
  }

  const { users, setUsers } = dataContext;

  const deleteUser = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the user?")) {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUsers((prev) => prev.filter((user) => user.id !== id));
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      {/* Fixed header with heading and button */}
      <Box w="50%" display="flex" justifyContent="space-between">
        <Heading as="h2">Users Page</Heading>
        <CreateUser title="Create User" />
      </Box>
      {/* Scrollable user list */}
      <SimpleGrid columns={1} gap={8} overflow="auto">
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
              <Button onClick={() => deleteUser(user.id)}>Delete User</Button>
              <EditUser id={user.id} />
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
