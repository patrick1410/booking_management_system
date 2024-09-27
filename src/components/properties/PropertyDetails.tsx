import { Link } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

type PropertyDetailsProps = {
  property: Property;
};

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
}) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Heading as="h3">{property.title}'s Details:</Heading>
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
    </>
  );
};
