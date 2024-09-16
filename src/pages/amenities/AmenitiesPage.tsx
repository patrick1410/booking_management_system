import { useContext } from "react";
import { DataContext } from "../../components/DataProvider";
import {
  Box,
  Card,
  CardBody,
  Text,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";

export const AmenitiesPage = () => {
  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.amenities.length === 0) {
    return <div>Loading...</div>;
  }

  const { amenities } = dataContext;

  return (
    <Box style={{ gridArea: "main", overflow: "auto" }}>
      <Heading as="h2">Amenities Page</Heading>
      <SimpleGrid columns={1} gap={8}>
        {amenities.map((amenity) => (
          <Card key={amenity.id}>
            <CardBody>
              <Text>id: {amenity.id}</Text>
              <Text>name: {amenity.name}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
