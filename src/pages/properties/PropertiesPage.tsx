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
    return <LoadingComponent resource="properties" />;
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
    "description",
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
      <SimpleGrid mt={2} columns={2} gap={8} overflow="auto">
        {orderedProperties.map((property) => (
          <Card key={property.id}>
            <CardBody>
              <Link to={`/properties/${property.id}`}>
                <Text>
                  <strong>id: </strong>
                  {property.id}
                </Text>
                <Text>
                  <strong>title: </strong>
                  {property.title}
                </Text>
                <Text>
                  <strong>description: </strong>
                  {property.description}
                </Text>
                <Text>
                  <strong>location: </strong>
                  {property.location}
                </Text>
                <Text>
                  <strong>pricePerNight: </strong>
                  {property.pricePerNight.toString().replace(".", ",")}
                </Text>
                <Text>
                  <strong>bedroomCount: </strong>
                  {property.bedroomCount}
                </Text>
                <Text>
                  <strong>bathRoomCount: </strong>
                  {property.bathRoomCount}
                </Text>
                <Text>
                  <strong>maxGuestCount: </strong>
                  {property.maxGuestCount}
                </Text>
                <Text>
                  <strong>hostId: </strong>
                  {property.hostId}
                </Text>
                <Text>
                  <strong>rating: </strong>
                  {property.rating}
                </Text>
                <Text>
                  <strong>amenities: </strong>
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
