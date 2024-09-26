import { Card, CardBody, Text, Box, Button } from "@chakra-ui/react";
import { EditAmenity } from "./EditAmenity";

type AmenityItemProps = {
  amenity: Amenity;
  deleteAmenity: (id: string) => void;
  token: string | null;
  noPermission: () => void;
};

export const AmenityItem: React.FC<AmenityItemProps> = ({
  amenity,
  deleteAmenity,
  token,
  noPermission,
}) => {
  return (
    <Card>
      <CardBody display="flex" flexDir="column" justifyContent="center">
        <Text>
          <strong>id: </strong>
          {amenity.id}
        </Text>
        <Text>
          <strong>name: </strong>
          {amenity.name}
        </Text>
        <Box mt={2}>
          <Button
            mr={4}
            onClick={token ? () => deleteAmenity(amenity.id) : noPermission}
          >
            Delete Amenity
          </Button>
          <EditAmenity id={amenity.id} />
        </Box>
      </CardBody>
    </Card>
  );
};
