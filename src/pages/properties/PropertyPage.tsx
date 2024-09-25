import { Heading, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { convertDate } from "../../utils/convertDate";
import { LoadingComponent } from "../../components/UI/LoadingComponent";
import { ErrorComponent } from "../../components/UI/ErrorComponent";

export const PropertyPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHost = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const response = await fetch(`http://localhost:3000/properties/${id}`);
        const propertyData = await response.json();
        setProperty(propertyData);
      } catch (error) {
        console.error("Error fetching property:", error);
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

  if (loading || !property) {
    return <LoadingComponent resource="property" />;
  }
  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <SimpleGrid columns={1} overflow="auto">
        <Box display="flex" alignItems="center">
          <Heading ml="0.5rem" as="h3">
            {property.title}'s Details:
          </Heading>
        </Box>

        <Box mb={"0.75rem"}>
          <Text>id: {property.id}</Text>
          <Text>description: {property.description}</Text>
          <Text>location: {property.location}</Text>
          <Text>
            pricePerNight: {property.pricePerNight.toString().replace(".", ",")}
          </Text>
          <Text>bedroomCount: {property.bedroomCount}</Text>
          <Text>bathRoomCount: {property.bathRoomCount}</Text>
          <Text>maxGuestCount: {property.maxGuestCount}</Text>
          <Text>
            <Link to={`/hosts/${property.hostId}`}>
              hostId: {property.hostId}
            </Link>
          </Text>
          <Text>rating: {property.rating}</Text>
          <Text>
            amenities:{" "}
            {property.amenities.length > 1
              ? property.amenities.map((amenity) => amenity.name).join(", ")
              : property.amenities.map((amenity) => amenity.name)}
          </Text>
        </Box>

        {property.reviews.length >= 1 && (
          <Box>
            <Heading as="h4">
              {property.reviews.length > 1 ? "Reviews:" : "Review:"}
            </Heading>
            {property.reviews.map((review, i) => (
              <Box mb={"0.75rem"} key={i}>
                <Text>id: {review.id}</Text>
                <Text>
                  <Link to={`/users/${review.userId}`}>
                    userId: {review.userId}
                  </Link>
                </Text>
                <Text>rating: {review.rating}</Text>
                <Text>comment: {review.comment}</Text>
                <hr />
              </Box>
            ))}
          </Box>
        )}

        {property.bookings.length >= 1 && (
          <Box>
            <Heading as="h4">
              {property.bookings.length > 1 ? "Bookings:" : "Booking"}
            </Heading>
            {property.bookings.map((booking, i) => (
              <Box mb={"0.75rem"} key={i}>
                <Text>id: {booking.id}</Text>
                <Link to={`/users/${booking.userId}`}>
                  userId: {booking.userId}
                </Link>
                <Text>checkinDate: {convertDate(booking.checkinDate)}</Text>
                <Text>checkoutDate: {convertDate(booking.checkoutDate)}</Text>
                <Text>numberOfGuests: {booking.numberOfGuests}</Text>
                <Text>
                  totalPrice: {booking.totalPrice.toString().replace(".", ",")}
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
