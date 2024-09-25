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
import { CreateProperty } from "../../components/properties/CreateProperty";
import { EditProperty } from "../../components/properties/EditProperty";
import { SearchBar } from "../../components/UI/SearchBar";
import { filterData } from "../../utils/filterData";
import { useResetSearchTerm } from "../../hooks/ResetSearchTerm";
import { Link } from "react-router-dom";
import { ErrorComponent } from "../../components/UI/ErrorComponent";
import { LoadingComponent } from "../../components/UI/LoadingComponent";

export const PropertiesPage = () => {
  useResetSearchTerm(); // Reset search term when page is loaded

  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  const {
    properties,
    setProperties,
    searchTerm,
    setSearchTerm,
    error,
    loading,
  } = dataContext;

  // Handle error starte
  if (error) {
    return <ErrorComponent error={error} />;
  }

  // Handle loading state
  if (loading) {
    return <LoadingComponent />;
  }

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

  const orderedProperties = [...filteredProperties].reverse(); // New properties first!

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
      <SimpleGrid
        sx={{ mt: "8px !important" }}
        columns={2}
        gap={8}
        overflow="auto"
      >
        {orderedProperties.map((property) => (
          <Card key={property.id}>
            <CardBody>
              <Link to={`/properties/${property.id}`}>
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
                  {property.amenities.length > 1
                    ? property.amenities
                        .map((amenity) => amenity.name)
                        .join(", ")
                    : property.amenities.map((amenity) => amenity.name)}
                </Text>
              </Link>
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
