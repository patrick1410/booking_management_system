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

export const PropertiesPage = () => {
  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.properties.length === 0) {
    return <div>Loading...</div>;
  }

  const { properties, setProperties } = dataContext;

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

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <Box w="50%" display="flex" justifyContent="space-between">
        <Heading as="h2">Properties Page</Heading>
        <CreateProperty title="Create Property" />
      </Box>
      <SimpleGrid columns={1} gap={8} overflow="auto">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardBody>
              <Text>id: {property.id}</Text>
              <Text>title: {property.title}</Text>
              <Text>description: {property.description}</Text>
              <Text>location: {property.location}</Text>
              <Text>pricePerNight: {property.pricePerNight}</Text>
              <Text>bedroomCount: {property.bedroomCount}</Text>
              <Text>bathRoomCount: {property.bathRoomCount}</Text>
              <Text>maxGuestCount: {property.maxGuestCount}</Text>
              <Text>hostId: {property.hostId}</Text>
              <Text>rating: {property.rating}</Text>
              <Text>
                amenityIds:{" "}
                {property.amenityIds.length > 1
                  ? property.amenityIds.join(", ")
                  : property.amenityIds}
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
