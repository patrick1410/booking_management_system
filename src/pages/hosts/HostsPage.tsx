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
import { CreateHost } from "../../components/hosts/CreateHost";
import { EditHost } from "../../components/hosts/EditHost";
import { SearchBar } from "../../components/UI/SearchBar";
import { filterData } from "../../utils/filterData";
import { useResetSearchTerm } from "../../hooks/ResetSearchTerm";
import { Link } from "react-router-dom";
import { ErrorComponent } from "../../components/UI/ErrorComponent";
import { LoadingComponent } from "../../components/UI/LoadingComponent";
import { getJWT } from "../../utils/getJWT";

export const HostsPage = () => {
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

  const { hosts, setHosts, searchTerm, setSearchTerm, error, loading } =
    dataContext;

  // Handle error starte
  if (error) {
    return <ErrorComponent error={error} />;
  }

  // Handle loading state
  if (loading) {
    return <LoadingComponent resource="hosts" />;
  }

  const deleteHost = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the host?")) {
        const response = await fetch(`http://localhost:3000/hosts/${id}`, {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        });

        if (response.ok) {
          setHosts((prev) => prev.filter((host) => host.id !== id));
          toast({
            title: "Host deleted",
            description: "The host has been successfully deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.error("Error deleting host:", error);
    }
  };

  const filteredHosts = filterData(hosts, searchTerm, [
    "username",
    "email",
    "name",
  ]);

  const orderedHosts = [...filteredHosts].reverse(); // New hosts first!

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
        <Heading as="h2">Hosts Page</Heading>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Hosts..."
        />
        <CreateHost />
      </Box>
      {/* Scrollable user list */}
      <SimpleGrid
        mt={2}
        columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
        gap={8}
        overflow="auto"
      >
        {orderedHosts.map((host) => (
          <Card key={host.id}>
            <CardBody display="flex" flexDir="column" justifyContent="center">
              <Link to={`/hosts/${host.id}`}>
                <Text>
                  <strong>id: </strong>
                  {host.id}
                </Text>
                <Text>
                  <strong>username: </strong>
                  {host.username}
                </Text>
                <Text>
                  <strong>password: </strong>
                  {host.password}
                </Text>
                <Text>
                  <strong>name: </strong>
                  {host.name}
                </Text>
                <Text>
                  <strong>email: </strong>
                  {host.email}
                </Text>
                <Text>
                  <strong>phoneNumber: </strong>
                  {host.phoneNumber}
                </Text>
                <Text>
                  <strong>profilePicture: </strong>
                  {host.profilePicture}
                </Text>
                <Text>
                  <strong>aboutMe: </strong>
                  {host.aboutMe}
                </Text>{" "}
              </Link>
              <Box mt={2}>
                <Button
                  mr={4}
                  onClick={token ? () => deleteHost(host.id) : noPermission}
                >
                  Delete Host
                </Button>
                <EditHost id={host.id} />
              </Box>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
