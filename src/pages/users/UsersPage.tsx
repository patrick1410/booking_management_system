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
  useToast,
} from "@chakra-ui/react";
import { CreateUser } from "../../components/users/CreateUser";
import { EditUser } from "../../components/users/EditUser";
import { SearchBar } from "../../components/UI/SearchBar";
import { filterData } from "../../utils/filterData";
import { useResetSearchTerm } from "../../hooks/ResetSearchTerm";
import { Link } from "react-router-dom";
import { ErrorComponent } from "../../components/UI/ErrorComponent";
import { LoadingComponent } from "../../components/UI/LoadingComponent";
import { getJWT } from "../../utils/getJWT";

export const UsersPage = () => {
  useResetSearchTerm(); // Reset search term when page is loaded
  const toast = useToast();
  const token = getJWT(); // Get token

  const noPermission = () => {
    toast({
      title: "Access denied!",
      description: "You must be logged in to perform this action.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  const { users, setUsers, searchTerm, setSearchTerm, error, loading } =
    dataContext;

  // Handle error starte
  if (error) {
    return <ErrorComponent error={error} />;
  }

  // Handle loading state
  if (loading) {
    return <LoadingComponent resource="users" />;
  }

  const deleteUser = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the user?")) {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        });

        if (response.ok) {
          setUsers((prev) => prev.filter((user) => user.id !== id));
          toast({
            title: "User deleted",
            description: "The user has been successfully deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
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
        w="100%"
        display="flex"
        flexDir={{ base: "column", lg: "row" }}
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
        mt={2}
        columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
        gap={8}
        overflow="auto"
      >
        {orderedUsers.map((user) => (
          <Card key={user.id}>
            <CardBody display="flex" flexDir="column" justifyContent="center">
              <Link to={`/users/${user.id}`}>
                <Text>
                  <strong>id: </strong>
                  {user.id}
                </Text>
                <Text>
                  <strong>username: </strong>
                  {user.username}
                </Text>
                <Text>
                  <strong>password: </strong>
                  {user.password}
                </Text>
                <Text>
                  <strong>name: </strong>
                  {user.name}
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
              </Link>
              <Box mt={2}>
                <Button
                  mr={4}
                  onClick={token ? () => deleteUser(user.id) : noPermission}
                >
                  Delete User
                </Button>
                <EditUser id={user.id} />
              </Box>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
