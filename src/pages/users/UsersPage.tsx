import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../components/SearchProvider";
import { Box, SimpleGrid, Heading, useToast } from "@chakra-ui/react";
import { CreateUser } from "../../components/users/CreateUser";
import { SearchBar } from "../../components/UI/SearchBar";
import { filterData } from "../../utils/filterData";
import { useResetSearch } from "../../hooks/useResetSearch";
import { ErrorComponent } from "../../components/UI/ErrorComponent";
import { LoadingComponent } from "../../components/UI/LoadingComponent";
import { getJWT } from "../../utils/getJWT";
import { useNoPermission } from "../../hooks/useNoPermission";
import { UserItem } from "../../components/users/UserItem";

export const UsersPage = () => {
  useResetSearch(); // Reset search term when page is loaded
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

  const searchContext = useContext(SearchContext);
  const { searchTerm, setSearchTerm } = searchContext;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <ErrorComponent error={error} />;
  }

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
      <Box
        w="100%"
        display="flex"
        flexDir={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" mt={{ base: 2.5, sm: 0 }}>
          Users Page
        </Heading>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Users..."
        />
        <CreateUser users={users} setUsers={setUsers} />
      </Box>
      <SimpleGrid
        mt={2}
        columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
        gap={8}
        overflow="auto"
      >
        {orderedUsers.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            deleteUser={deleteUser}
            token={token}
            noPermission={noPermission}
            users={users}
            setUsers={setUsers}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
