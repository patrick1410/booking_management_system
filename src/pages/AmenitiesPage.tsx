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

export const AmenitiesPage = () => {
  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.amenities.length === 0) {
    return <div>Loading...</div>;
  }

  const { amenities, setAmenities } = dataContext || {};

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

  return (
    <Box style={{ gridArea: "main", overflow: "auto" }}>
      <Box w="50%" display="flex" justifyContent="space-between">
        <Heading as="h2">Amenities Page</Heading>
        <CreateAmenity title="Create Amenity" />
      </Box>
      <SimpleGrid columns={1} gap={8}>
        {amenities.map((amenity) => (
          <Card key={amenity.id}>
            <CardBody>
              <Text>id: {amenity.id}</Text>
              <Text>name: {amenity.name}</Text>
              <Button onClick={() => deleteAmenity(amenity.id)}>
                Delete Amenity
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
