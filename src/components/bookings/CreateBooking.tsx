import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { convertToLocal } from "../../utils/convertToLocal";

type FormProps = Booking;

export const CreateBooking = () => {
  const dataContext = useContext(DataContext);
  const { bookings = [], setBookings = () => {} } = dataContext || {}; // Default to empty array and noop function

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormProps>({});

  const createBooking = async (booking: FormProps) => {
    try {
      const response = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        body: JSON.stringify({
          userId: booking.userId,
          propertyId: booking.propertyId,
          checkinDate: convertToLocal(booking.checkinDate),
          checkoutDate: convertToLocal(booking.checkoutDate),
          numberOfGuests: booking.numberOfGuests,
          totalPrice: booking.totalPrice,
          bookingStatus: booking.bookingStatus,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      const newBooking = await response.json();
      if (setBookings) {
        setBookings([...bookings, newBooking]);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Create Booking</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Booking</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl as="form">
              <FormLabel htmlFor="userId">User Id:</FormLabel>
              <Input
                type="text"
                id="userId"
                placeholder="Enter the user id..."
                {...register("userId", { required: true })}
              />

              <FormLabel htmlFor="propertyId">Property Id:</FormLabel>
              <Input
                type="text"
                id="propertyId"
                placeholder="Enter the property id..."
                {...register("propertyId", { required: true })}
              />

              <FormLabel htmlFor="checkinDate">Check-in Date:</FormLabel>
              <Input
                type="datetime-local"
                id="checkinDate"
                placeholder="Select the check-in date..."
                {...register("checkinDate", { required: true })}
              />

              <FormLabel htmlFor="checkoutDate">Check-out Date:</FormLabel>
              <Input
                type="datetime-local"
                id="checkoutDate"
                placeholder="Select the check-out date..."
                {...register("checkoutDate", { required: true })}
              />

              <FormLabel htmlFor="numberOfGuests">Number of Guests:</FormLabel>
              <Input
                type="number"
                id="numberOfGuests"
                placeholder="Enter the number of guests..."
                {...register("numberOfGuests", {
                  required: true,
                  valueAsNumber: true,
                })}
              />

              <FormLabel htmlFor="totalPrice">Total Price:</FormLabel>
              <Input
                type="number"
                id="totalPrice"
                placeholder="Enter the total price..."
                step="0.01"
                {...register("totalPrice", {
                  required: true,
                  valueAsNumber: true,
                })}
              />

              <FormLabel htmlFor="bookingStatus">Booking Status:</FormLabel>
              <Select
                id="bookingStatus"
                {...register("bookingStatus", { required: true })}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit(createBooking)} variant="ghost">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
