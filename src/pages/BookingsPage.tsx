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
import { CreateBooking } from "../components/bookings/CreateBooking";
import { EditBooking } from "../components/bookings/EditBooking";

export const BookingsPage = () => {
  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.bookings.length === 0) {
    return <div>Loading...</div>;
  }

  const { bookings, setBookings } = dataContext;

  const deleteBooking = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the booking?")) {
        const response = await fetch(`http://localhost:3000/bookings/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setBookings((prev) => prev.filter((booking) => booking.id !== id));
        }
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      {/* Fixed header with heading and button */}
      <Box w="50%" display="flex" justifyContent="space-between">
        <Heading as="h2">Bookings Page</Heading>
        <CreateBooking title="Create Booking" />
      </Box>
      <SimpleGrid columns={1} gap={8} overflow="auto">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardBody>
              <Text>id: {booking.id}</Text>
              <Text>userId: {booking.userId}</Text>
              <Text>propertyId: {booking.propertyId}</Text>
              <Text>checkinDate: {booking.checkinDate}</Text>
              <Text>checkoutDate: {booking.checkoutDate}</Text>
              <Text>numberOfGuests: {booking.numberOfGuests}</Text>
              <Text>totalPrice: {booking.totalPrice}</Text>
              <Text>bookingStatus: {booking.bookingStatus}</Text>
              <Button onClick={() => deleteBooking(booking.id)}>
                Delete Booking
              </Button>
              <EditBooking id={booking.id} />
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
