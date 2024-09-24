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
import { SearchBar } from "../components/UI/SearchBar";
import { filterData } from "../utils/filterData";
import { useResetSearchTerm } from "../hooks/ResetSearchTerm";
import { convertDate } from "../utils/convertDate";
import { Link } from "react-router-dom";

export const BookingsPage = () => {
  useResetSearchTerm(); // Reset search term when page is loaded

  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.bookings.length === 0) {
    return <div>Loading...</div>;
  }

  const { bookings, setBookings, searchTerm, setSearchTerm } = dataContext;

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

  const filteredBookings = filterData(bookings, searchTerm, [
    "userId",
    "propertyId",
    "bookingStatus",
  ]);

  const orderedBookings = [...filteredBookings].reverse(); // New bookings first!

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      {/* Fixed header with heading and button */}
      <Box
        w="80%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2">Bookings Page</Heading>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Bookings..."
        />
        <CreateBooking />
      </Box>
      <SimpleGrid
        sx={{ mt: "8px !important" }}
        columns={2}
        gap={8}
        overflow="auto"
      >
        {orderedBookings.map((booking) => (
          <Card key={booking.id}>
            <CardBody>
              <Text>id: {booking.id}</Text>
              <Text>
                <Link to={`/users/${booking.userId}`}>
                  userId: {booking.userId}
                </Link>
              </Text>
              <Text>
                <Link to={`/properties/${booking.propertyId}`}>
                  propertyId: {booking.propertyId}
                </Link>
              </Text>
              <Text>checkinDate: {convertDate(booking.checkinDate)}</Text>
              <Text>checkoutDate: {convertDate(booking.checkoutDate)}</Text>
              <Text>numberOfGuests: {booking.numberOfGuests}</Text>
              <Text>
                totalPrice: &euro;
                {booking.totalPrice.toString().replace(".", ",")}
              </Text>
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
