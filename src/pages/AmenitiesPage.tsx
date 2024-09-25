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
import { CreateAmenity } from "../components/amenities/CreateAmenity";
import { EditAmenity } from "../components/amenities/EditAmenity";
import { SearchBar } from "../components/UI/SearchBar";
import { filterData } from "../utils/filterData";
import { useResetSearchTerm } from "../hooks/ResetSearchTerm";
import { ErrorComponent } from "../components/UI/ErrorComponent";
import { LoadingComponent } from "../components/UI/LoadingComponent";

export const AmenitiesPage = () => {
  useResetSearchTerm(); // Reset search term when page is loaded

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
    return <LoadingComponent />;
  }

  const deleteAmenity = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the amenity?")) {
        const response = await fetch(`http://localhost:3000/amenities/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setAmenities((prev) => prev.filter((amenity) => amenity.id !== id));
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
        w="80%"
        display="flex"
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
        sx={{ mt: "8px !important" }}
        columns={3}
        gap={8}
        overflow="auto"
      >
        {orderedAmenities.map((amenity) => (
          <Card key={amenity.id}>
            <CardBody>
              <Text>id: {amenity.id}</Text>
              <Text>name: {amenity.name}</Text>
              <Button onClick={() => deleteAmenity(amenity.id)}>
                Delete Amenity
              </Button>
              <EditAmenity id={amenity.id} />
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
