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
import { CreateHost } from "../../components/hosts/CreateHost";
import { EditHost } from "../../components/hosts/EditHost";
import { SearchBar } from "../../components/UI/SearchBar";
import { filterData } from "../../utils/filterData";
import { useResetSearchTerm } from "../../hooks/ResetSearchTerm";
import { Link } from "react-router-dom";
import { ErrorComponent } from "../../components/UI/ErrorComponent";
import { LoadingComponent } from "../../components/UI/LoadingComponent";

export const HostsPage = () => {
  useResetSearchTerm(); // Reset search term when page is loaded

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
        });

        if (response.ok) {
          setHosts((prev) => prev.filter((host) => host.id !== id));
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
        w="80%"
        display="flex"
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
      <SimpleGrid mt={2} columns={2} gap={8} overflow="auto">
        {orderedHosts.map((host) => (
          <Card key={host.id}>
            <CardBody>
              <Link to={`/hosts/${host.id}`}>
                <Text>id: {host.id}</Text>
                <Text>username: {host.username}</Text>
                <Text>password: {host.password}</Text>
                <Text>name: {host.name}</Text>
                <Text>email: {host.email}</Text>
                <Text>phoneNumber: {host.phoneNumber}</Text>
                <Text>profilePicture: {host.profilePicture}</Text>
                <Text>aboutMe: {host.aboutMe}</Text>{" "}
              </Link>
              <Button onClick={() => deleteHost(host.id)}>Delete Host</Button>
              <EditHost id={host.id} />
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
