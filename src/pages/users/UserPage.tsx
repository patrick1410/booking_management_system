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
          <Text>
            <strong>id: </strong>
            {user.id}
          </Text>
          <Text>
            <strong>username: </strong>
            {user.username}
          </Text>
          <Text>
            <strong>password </strong>
            {user.password}
          </Text>
          <Text>
            <strong>email: </strong>
            {user.email}
          </Text>
          <Text>
            <strong>phoneNumber: </strong>
            {user.phoneNumber}
          </Text>
          <Text>
            <strong>profilePicture: </strong>
            {user.profilePicture}
          </Text>
        </Box>

        {user.Review.length >= 1 && (
          <Box>
            <Heading as="h4">
              {user.Review.length > 1 ? "Reviews:" : "Review:"}
            </Heading>
            {user.Review.map((review, i) => (
              <Box mb={"0.75rem"} key={i}>
                <Text>
                  <strong>id: </strong>
                  {review.id}
                </Text>
                <Text>
                  <strong>userId: </strong>
                  {review.userId}
                </Text>
                <Text>
                  <strong>rating: </strong> {review.rating}
                </Text>
                <Text>
                  <strong>comment: </strong>
                  {review.comment}
                </Text>
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
                <Text>
                  <strong>id: </strong>
                  {booking.id}
                </Text>
                <Text>
                  <strong>userId: </strong>
                  {booking.userId}
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
                <hr />
              </Box>
            ))}
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};
