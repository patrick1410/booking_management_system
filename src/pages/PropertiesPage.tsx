import { useContext } from "react";
import { DataContext } from "../components/DataProvider";
import {
  Box,
  Card,
  CardBody,
  Text,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";

export const PropertiesPage = () => {
  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.properties.length === 0) {
    return <div>Loading...</div>;
  }

  const { properties } = dataContext;

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <Heading as="h2">Properties Page</Heading>
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
              <Text>amenityIds: {property.amenityIds.join(", ")}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
