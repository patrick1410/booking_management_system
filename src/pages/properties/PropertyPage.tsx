import { Heading, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { convertDate } from "../../utils/convertDate";

export const PropertyPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/properties/${id}`);
        const propertyData = await response.json();
        setProperty(propertyData);
      } catch (error) {
        console.error("Error fetching host:", error);
      }
    };

    fetchHost();
  }, []);

  if (!property) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <SimpleGrid columns={1} overflow="auto">
        <Box display="flex" alignItems="center">
          <Heading ml="0.5rem !important" as="h3">
            {property.title}'s Details:
          </Heading>
        </Box>
        <Box>
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

        <Box>
          <Heading as="h4">Reviews:</Heading>
          {property.reviews.map((review, i) => (
            <Box key={i}>
              <Text>id: {review.id}</Text>
              <Text>
                <Link to={`/users/${review.userId}`}>
                  userId: {review.userId}
                </Link>
              </Text>
              <Text>rating: {review.rating}</Text>
              <Text>comment: {review.comment}</Text>
            </Box>
          ))}
        </Box>

        <Box>
          <Heading as="h4">Bookings:</Heading>
          {property.bookings.map((booking, i) => (
            <Box sx={{ mb: "0.75rem !important " }} key={i}>
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
              <hr style={{ width: "30%" }} />
            </Box>
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  );
};
