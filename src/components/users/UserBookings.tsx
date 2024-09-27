import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { convertDate } from "../../utils/convertDate";

type UserBookingsProps = {
  user: User;
};

export const UserBookings: React.FC<UserBookingsProps> = ({ user }) => {
  return (
    <>
      <Box>
        <Heading as="h4">
          {" "}
          {user.Booking.length > 1 ? "Bookings:" : "Booking:"}
        </Heading>
        {user.Booking.map((booking) => (
          <Box mb={"0.75rem"} key={booking.id}>
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
    </>
  );
};
