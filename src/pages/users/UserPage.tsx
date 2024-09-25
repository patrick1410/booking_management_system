import { Heading, Text, Box, SimpleGrid, Avatar } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { convertDate } from "../../utils/convertDate";
import { LoadingComponent } from "../../components/UI/LoadingComponent";
import { ErrorComponent } from "../../components/UI/ErrorComponent";

export const UserPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHost = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHost();
  }, []);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (loading || !user) {
    return <LoadingComponent resource="user" />;
  }

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <SimpleGrid columns={1} overflow="auto">
        <Box display="flex" alignItems="center">
          <Avatar src={user.profilePicture} name={user.name} />
          <Heading ml="0.5rem" as="h3">
            {user.name}'s Details:
          </Heading>
        </Box>
        <Box mb={"0.75rem"}>
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
              <Box mb={"0.75rem"} key={i}>
                <Text>id: {review.id}</Text>
                <Text>userId: {review.userId}</Text>
                <Text>rating: {review.rating}</Text>
                <Text>comment: {review.comment}</Text>
                <hr />
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
              <Box mb={"0.75rem"} key={i}>
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
                <hr />
              </Box>
            ))}
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};
