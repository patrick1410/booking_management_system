import { Link } from "react-router-dom";
import { Card, CardBody, Text, Button, Box } from "@chakra-ui/react";
import { convertDate } from "../../utils/convertDate";
import { EditBooking } from "./EditBooking";

type BookingItemProps = {
  booking: Booking;
  deleteBooking: (id: string) => void;
  token: string | null;
  noPermission: () => void;
};

export const BookingItem: React.FC<BookingItemProps> = ({
  booking,
  deleteBooking,
  token,
  noPermission,
}) => {
  return (
    <Card key={booking.id}>
      <CardBody display="flex" flexDir="column" justifyContent="center">
        <Text>
          <strong>id: </strong>
          {booking.id}
        </Text>
        <Text>
          <Link to={`/users/${booking.userId}`}>
            <strong>userId: </strong>
            {booking.userId}
          </Link>
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
        <Box mt={2}>
          <Button
            mr={4}
            onClick={token ? () => deleteBooking(booking.id) : noPermission}
          >
            Delete Booking
          </Button>
          <EditBooking id={booking.id} />
        </Box>
      </CardBody>
    </Card>
  );
};
