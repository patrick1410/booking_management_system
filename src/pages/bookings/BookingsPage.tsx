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

export const BookingsPage = () => {
  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.bookings.length === 0) {
    return <div>Loading...</div>;
  }

  const { bookings } = dataContext;

  return (
    <Box style={{ gridArea: "main", overflow: "auto" }}>
      <Heading as="h2">Bookings Page</Heading>
      <SimpleGrid columns={1} gap={8}>
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardBody>
              <Text>userId: {booking.userId}</Text>
              <Text>propertyId: {booking.propertyId}</Text>
              <Text>checkinDate: {booking.checkinDate}</Text>
              <Text>checkoutDate: {booking.checkoutDate}</Text>
              <Text>numberOfGuests: {booking.numberOfGuests}</Text>
              <Text>totalPrice: {booking.totalPrice}</Text>
              <Text>bookingStatus: {booking.bookingStatus}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
