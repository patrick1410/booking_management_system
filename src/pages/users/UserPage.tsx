import { Box, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingComponent } from "../../components/UI/LoadingComponent";
import { ErrorComponent } from "../../components/UI/ErrorComponent";
import { UserDetails } from "../../components/users/UserDetails";
import { UserReviews } from "../../components/users/UserReviews";
import { UserBookings } from "../../components/users/UserBookings";

export const UserPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHost = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://booking-api-vtw8.onrender.com/users/${id}`
        );
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
        <UserDetails user={user} />

        {user.Review.length >= 1 && <UserReviews user={user} />}

        {user.Booking.length >= 1 && <UserBookings user={user} />}
      </SimpleGrid>
    </Box>
  );
};
