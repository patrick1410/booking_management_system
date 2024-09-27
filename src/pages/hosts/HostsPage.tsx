import { useContext } from "react";
import { DataContext } from "../../components/DataProvider";
import { Box, SimpleGrid, Heading, useToast } from "@chakra-ui/react";
import { CreateHost } from "../../components/hosts/CreateHost";
import { SearchBar } from "../../components/UI/SearchBar";
import { filterData } from "../../utils/filterData";
import { useResetSearch } from "../../hooks/useResetSearch";
import { ErrorComponent } from "../../components/UI/ErrorComponent";
import { LoadingComponent } from "../../components/UI/LoadingComponent";
import { getJWT } from "../../utils/getJWT";
import { useNoPermission } from "../../hooks/useNoPermission";
import { HostItem } from "../../components/hosts/HostItem";

export const HostsPage = () => {
  useResetSearch(); // Reset search term when page is loaded
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

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
        <Heading as="h2" mt={{ base: 2.5, sm: 0 }}>
          Hosts Page
        </Heading>
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
          <HostItem
            key={host.id}
            host={host}
            deleteHost={deleteHost}
            token={token}
            noPermission={noPermission}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
