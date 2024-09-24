import { Heading, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { convertDate } from "../../utils/convertDate";

export const UserPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchHost();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <SimpleGrid columns={1} overflow="auto">
        <Box display="flex" alignItems="center">
          <Heading ml="0.5rem !important" as="h3">
            {user.name}'s Details:
          </Heading>
        </Box>
        <Box>
          <Text>id: {user.id}</Text>
          <Text>username: {user.username}</Text>
          <Text>password {user.password}</Text>
          <Text>email: {user.email}</Text>
          <Text>phoneNumber: {user.phoneNumber}</Text>
          <Text>profilePicture: {user.profilePicture}</Text>
        </Box>

        {user.Review.length >= 1 && (
          <Box>
            <Heading as="h4">
              {user.Review.length > 1 ? "Reviews:" : "Review:"}
            </Heading>
            {user.Review.map((review, i) => (
              <Box sx={{ mb: "0.75rem !important " }} key={i}>
                <Text>id: {review.id}</Text>
                <Text>userId: {review.userId}</Text>
                <Text>rating: {review.rating}</Text>
                <Text>comment: {review.comment}</Text>
                <hr style={{ width: "30%" }} />
              </Box>
            ))}
          </Box>
        )}

        {user.Booking.length >= 1 && (
          <Box>
            <Heading as="h4">
              {" "}
              {user.Booking.length > 1 ? "Bookings:" : "Booking:"}
            </Heading>
            {user.Booking.map((booking, i) => (
              <Box sx={{ mb: "0.75rem !important " }} key={i}>
                <Text>id: {booking.id}</Text>
                <Text>userId: {booking.userId}</Text>
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
                <hr style={{ width: "30%" }} />
              </Box>
            ))}
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};
