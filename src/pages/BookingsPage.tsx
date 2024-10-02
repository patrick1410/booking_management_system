import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../components/SearchProvider";
import { Box, SimpleGrid, Heading, useToast } from "@chakra-ui/react";
import { CreateBooking } from "../components/bookings/CreateBooking";
import { SearchBar } from "../components/UI/SearchBar";
import { filterData } from "../utils/filterData";
import { useResetSearch } from "../hooks/useResetSearch";
import { LoadingComponent } from "../components/UI/LoadingComponent";
import { ErrorComponent } from "../components/UI/ErrorComponent";
import { getJWT } from "../utils/getJWT";
import { useNoPermission } from "../hooks/useNoPermission";
import { BookingItem } from "../components/bookings/BookingItem";

export const BookingsPage = () => {
  const noPermission = useNoPermission();
  useResetSearch(); // Reset search term when page is loaded
  const toast = useToast();
  const token = getJWT(); // Get token

  const searchContext = useContext(SearchContext);
  const { searchTerm, setSearchTerm } = searchContext;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://booking-api-vtw8.onrender.com/bookings"
        );
        const bookings = await response.json();
        setBookings(bookings);
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (loading) {
    return <LoadingComponent resource="bookings" />;
  }

  const deleteBooking = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the booking?")) {
        const response = await fetch(
          `https://booking-api-vtw8.onrender.com/bookings/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `${token}` },
          }
        );

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
      {/* Fixed header with heading, searchbar and create button */}
      <Box
        w="100%"
        display="flex"
        flexDir={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" mt={{ base: 2.5, sm: 0 }}>
          Bookings Page
        </Heading>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Bookings..."
        />
        <CreateBooking bookings={bookings} setBookings={setBookings} />
      </Box>
      {/* Scrollable bookings list */}
      <SimpleGrid
        mt={2}
        columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
        gap={8}
        overflow="auto"
      >
        {orderedBookings.map((booking) => (
          <BookingItem
            key={booking.id}
            booking={booking}
            deleteBooking={deleteBooking}
            token={token}
            noPermission={noPermission}
            bookings={bookings}
            setBookings={setBookings}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
