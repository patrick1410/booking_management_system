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
          <Text>
            <strong>id: </strong>
            {property.id}
          </Text>
          <Text>
            <strong>description: </strong>
            {property.description}
          </Text>
          <Text>
            <strong>location: </strong>
            {property.location}
          </Text>
          <Text>
            <strong>pricePerNight: </strong>
            {property.pricePerNight.toString().replace(".", ",")}
          </Text>
          <Text>
            <strong>bedroomCount: </strong>
            {property.bedroomCount}
          </Text>
          <Text>
            <strong>bathRoomCount: </strong>
            {property.bathRoomCount}
          </Text>
          <Text>
            <strong>maxGuestCount: </strong>
            {property.maxGuestCount}
          </Text>
          <Text>
            <Link to={`/hosts/${property.hostId}`}>
              <strong>hostId: </strong>
              {property.hostId}
            </Link>
          </Text>
          <Text>
            <strong>rating: </strong>
            {property.rating}
          </Text>
          <Text>
            <strong>amenities: </strong>
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
                <Text>
                  <strong>id: </strong>
                  {review.id}
                </Text>
                <Text>
                  <Link to={`/users/${review.userId}`}>
                    <strong>userId: </strong>
                    {review.userId}
                  </Link>
                </Text>
                <Text>
                  <strong>rating: </strong>
                  {review.rating}
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

        {property.bookings.length >= 1 && (
          <Box>
            <Heading as="h4">
              {property.bookings.length > 1 ? "Bookings:" : "Booking"}
            </Heading>
            {property.bookings.map((booking, i) => (
              <Box mb={"0.75rem"} key={i}>
                <Text>
                  <strong>id: </strong>
                  {booking.id}
                </Text>
                <Link to={`/users/${booking.userId}`}>
                  <strong>userId: </strong>
                  {booking.userId}
                </Link>
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
                  <strong>totalPrice: </strong>
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
