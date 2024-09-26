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
  useToast,
} from "@chakra-ui/react";
import { CreateAmenity } from "../components/amenities/CreateAmenity";
import { EditAmenity } from "../components/amenities/EditAmenity";
import { SearchBar } from "../components/UI/SearchBar";
import { filterData } from "../utils/filterData";
import { useResetSearchTerm } from "../hooks/ResetSearchTerm";
import { ErrorComponent } from "../components/UI/ErrorComponent";
import { LoadingComponent } from "../components/UI/LoadingComponent";
import { getJWT } from "../utils/getJWT";

export const AmenitiesPage = () => {
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

  const { amenities, setAmenities, searchTerm, setSearchTerm, error, loading } =
    dataContext;

  // Handle error starte
  if (error) {
    return <ErrorComponent error={error} />;
  }

  // Handle loading state
  if (loading) {
    return <LoadingComponent resource="amenities" />;
  }

  const deleteAmenity = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the amenity?")) {
        const response = await fetch(`http://localhost:3000/amenities/${id}`, {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        });

        if (response.ok) {
          setAmenities((prev) => prev.filter((amenity) => amenity.id !== id));
          toast({
            title: "Amenity deleted",
            description: "The amenity has been successfully deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.error("Error deleting amenity:", error);
    }
  };

  const filteredAmenities = filterData(amenities, searchTerm, ["name"]);

  const orderedAmenities = [...filteredAmenities].reverse(); // New amenities first!

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <Box
        w="100%"
        display="flex"
        flexDir={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2">Amenities Page</Heading>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Amenities..."
        />
        <CreateAmenity />
      </Box>
      <SimpleGrid
        mt={2}
        columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
        gap={8}
        overflow="auto"
      >
        {orderedAmenities.map((amenity) => (
          <Card key={amenity.id}>
            <CardBody display="flex" flexDir="column" justifyContent="center">
              <Text>
                <strong>id: </strong>
                {amenity.id}
              </Text>
              <Text>
                <strong>name: </strong>
                {amenity.name}
              </Text>
              <Box mt={2}>
                <Button
                  mr={4}
                  onClick={
                    token ? () => deleteAmenity(amenity.id) : noPermission
                  }
                >
                  Delete Amenity
                </Button>
                <EditAmenity id={amenity.id} />
              </Box>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
