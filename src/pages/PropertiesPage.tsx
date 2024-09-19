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
import { CreateProperty } from "../components/properties/CreateProperty";
import { EditProperty } from "../components/properties/EditProperty";
import { SearchBar } from "../components/UI/SearchBar";
import { filterData } from "../utils/filterData";
import { useResetSearchTerm } from "../hooks/ResetSearchTerm";
import { createAmenityMap } from "../utils/amenityMapper";

export const PropertiesPage = () => {
  useResetSearchTerm(); // Reset search term when page is loaded

  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.properties.length === 0) {
    return <div>Loading...</div>;
  }

  const { properties, setProperties, searchTerm, setSearchTerm, amenities } =
    dataContext;

  // Create a map of amenities
  const amenityMap = createAmenityMap(amenities);

  const deleteProperty = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the property?")) {
        const response = await fetch(`http://localhost:3000/properties/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setProperties((prev) =>
            prev.filter((property) => property.id !== id)
          );
        }
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const filteredProperties = filterData(properties, searchTerm, [
    "title",
    "description", // Maybe..
    "location",
    "hostId",
  ]);

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <Box
        w="80%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2">Properties Page</Heading>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Properties..."
        />
        <CreateProperty />
      </Box>
      <SimpleGrid columns={1} gap={8} overflow="auto">
        {filteredProperties.map((property) => (
          <Card key={property.id}>
            <CardBody>
              <Text>id: {property.id}</Text>
              <Text>title: {property.title}</Text>
              <Text>description: {property.description}</Text>
              <Text>location: {property.location}</Text>
              <Text>
                pricePerNight:{" "}
                {property.pricePerNight.toString().replace(".", ",")}
              </Text>
              <Text>bedroomCount: {property.bedroomCount}</Text>
              <Text>bathRoomCount: {property.bathRoomCount}</Text>
              <Text>maxGuestCount: {property.maxGuestCount}</Text>
              <Text>hostId: {property.hostId}</Text>
              <Text>rating: {property.rating}</Text>
              <Text>
                amenities:{" "}
                {property.amenityIds
                  .map((id) => amenityMap[id]) // Map IDs to names
                  .join(", ")}
              </Text>
              <Button onClick={() => deleteProperty(property.id)}>
                Delete Property
              </Button>
              <EditProperty id={property.id} />
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
