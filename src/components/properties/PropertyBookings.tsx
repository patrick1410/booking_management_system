import { Link } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import { convertDate } from "../../utils/convertDate";

type PropertyBookingsProps = {
  property: Property;
};

export const PropertyBookings: React.FC<PropertyBookingsProps> = ({
  property,
}) => {
  return (
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
            &euro;{booking.totalPrice.toString().replace(".", ",")}
          </Text>
          <Text>
            <strong>bookingStatus: </strong>
            {booking.bookingStatus}
          </Text>
          <hr />
        </Box>
      ))}
    </Box>
  );
};
