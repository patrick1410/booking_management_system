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
  useToast,
} from "@chakra-ui/react";
import { CreateBooking } from "../components/bookings/CreateBooking";
import { EditBooking } from "../components/bookings/EditBooking";
import { SearchBar } from "../components/UI/SearchBar";
import { filterData } from "../utils/filterData";
import { useResetSearchTerm } from "../hooks/ResetSearchTerm";
import { convertDate } from "../utils/convertDate";
import { Link } from "react-router-dom";
import { LoadingComponent } from "../components/UI/LoadingComponent";
import { ErrorComponent } from "../components/UI/ErrorComponent";
import { getJWT } from "../utils/getJWT";

export const BookingsPage = () => {
  useResetSearchTerm(); // Reset search term when page is loaded
  const toast = useToast();
  const token = getJWT(); // Get token

  const noPermission = () => {
    toast({
      title: "Access denied!",
      description: "You must be logged in to perform this action.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  const { bookings, setBookings, searchTerm, setSearchTerm, error, loading } =
    dataContext;

  // Handle error starte
  if (error) {
    return <ErrorComponent error={error} />;
  }

  // Handle loading state
  if (loading) {
    return <LoadingComponent resource="bookings" />;
  }

  const deleteBooking = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the booking?")) {
        const response = await fetch(`http://localhost:3000/bookings/${id}`, {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        });

        if (response.ok) {
          setBookings((prev) => prev.filter((booking) => booking.id !== id));
          toast({
            title: "Booking deleted",
            description: "The booking has been successfully deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
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
        w="100%"
        display="flex"
        flexDir={{ base: "column", lg: "row" }}
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
        mt={2}
        columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
        gap={8}
        overflow="auto"
      >
        {orderedBookings.map((booking) => (
          <Card key={booking.id}>
            <CardBody display="flex" flexDir="column" justifyContent="center">
              <Text>
                <strong>id: </strong>
                {booking.id}
              </Text>
              <Text>
                <Link to={`/users/${booking.userId}`}>
                  <strong>userId: </strong>
                  {booking.userId}
                </Link>
              </Text>
              <Text>
                <Link to={`/properties/${booking.propertyId}`}>
                  <strong>propertyId: </strong>
                  {booking.propertyId}
                </Link>
              </Text>
              <Text>
                <strong>checkinDate: </strong>
                {convertDate(booking.checkinDate)}
              </Text>
              <Text>
                <strong>checkoutDate: </strong>
                {convertDate(booking.checkoutDate)}
              </Text>
              <Text>
                <strong>numberOfGuests: </strong>
                {booking.numberOfGuests}
              </Text>
              <Text>
                <strong>totalPrice: </strong>&euro;
                {booking.totalPrice.toString().replace(".", ",")}
              </Text>
              <Text>
                <strong>bookingStatus: </strong>
                {booking.bookingStatus}
              </Text>
              <Box mt={2}>
                <Button
                  mr={4}
                  onClick={
                    token ? () => deleteBooking(booking.id) : noPermission
                  }
                >
                  Delete Booking
                </Button>
                <EditBooking id={booking.id} />
              </Box>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
