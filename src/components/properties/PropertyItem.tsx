import { Link } from "react-router-dom";
import { Card, CardBody, Text, Box, Button } from "@chakra-ui/react";
import { EditProperty } from "./EditProperty";

type PropertyItemProps = {
  property: Property;
  deleteProperty: (id: string) => void;
  token: string | null;
  noPermission: () => void;
  amenities: Amenity[];
  properties: Property[];
  setProperties: (properties: Property[]) => void;
};

export const PropertyItem: React.FC<PropertyItemProps> = ({
  property,
  deleteProperty,
  token,
  noPermission,
  amenities,
  properties,
  setProperties,
}) => {
  return (
    <Card key={property.id}>
      <CardBody display="flex" flexDir="column" justifyContent="center">
        <Link to={`/properties/${property.id}`}>
          <Text>
            <strong>id: </strong>
            {property.id}
          </Text>
          <Text>
            <strong>title: </strong>
            {property.title}
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
            &euro;{property.pricePerNight.toString().replace(".", ",")}
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
            <strong>hostId: </strong>
            {property.hostId}
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
        </Link>
        <Box mt={2}>
          <Button
            mr={4}
            onClick={token ? () => deleteProperty(property.id) : noPermission}
          >
            Delete Property
          </Button>
          <EditProperty
            amenities={amenities}
            properties={properties}
            setProperties={setProperties}
            id={property.id}
          />
        </Box>
      </CardBody>
    </Card>
  );
};
