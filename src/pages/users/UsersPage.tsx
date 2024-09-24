import { useContext } from "react";
import { DataContext } from "../../components/DataProvider";
import {
  Box,
  Card,
  CardBody,
  Text,
  SimpleGrid,
  Heading,
  Button,
} from "@chakra-ui/react";
import { CreateUser } from "../../components/users/CreateUser";
import { EditUser } from "../../components/users/EditUser";
import { SearchBar } from "../../components/UI/SearchBar";
import { filterData } from "../../utils/filterData";
import { useResetSearchTerm } from "../../hooks/ResetSearchTerm";
import { Link } from "react-router-dom";

export const UsersPage = () => {
  useResetSearchTerm(); // Reset search term when page is loaded

  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.users.length === 0) {
    return <div>Loading...</div>;
  }

  const { users, setUsers, searchTerm, setSearchTerm } = dataContext;

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

  const filteredUsers = filterData(users, searchTerm, [
    "username",
    "email",
    "name",
  ]);

  const orderedUsers = [...filteredUsers].reverse(); // New users first!

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      {/* Fixed header with heading and button */}
      <Box
        w="80%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2">Users Page</Heading>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Users..."
        />
        <CreateUser />
      </Box>
      {/* Scrollable user list */}
      <SimpleGrid
        sx={{ mt: "8px !important" }}
        columns={2}
        gap={8}
        overflow="auto"
      >
        {orderedUsers.map((user) => (
          <Card key={user.id}>
            <CardBody>
              <Link to={`/users/${user.id}`}>
                <Text>id: {user.id}</Text>
                <Text>username: {user.username}</Text>
                <Text>password {user.password}</Text>
                <Text>name: {user.name}</Text>
                <Text>email: {user.email}</Text>
                <Text>phoneNumber: {user.phoneNumber}</Text>
                <Text>profilePicture: {user.profilePicture}</Text>
              </Link>
              <Button onClick={() => deleteUser(user.id)}>Delete User</Button>
              <EditUser id={user.id} />
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
