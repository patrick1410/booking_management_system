import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { convertToLocal } from "../../utils/convertToLocal";
import { getJWT } from "../../utils/getJWT";
import { useNoPermission } from "../../hooks/useNoPermission";

type EditBookingProps = {
  id: string;
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
};

type FormProps = Booking;

export const EditBooking: React.FC<EditBookingProps> = ({
  id,
  bookings,
  setBookings,
}) => {
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

  // Find the booking by id
  const booking = bookings.find((booking) => booking.id === id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      userId: booking?.userId,
      propertyId: booking?.propertyId,
      checkinDate: booking?.checkinDate.toString().slice(0, 16),
      checkoutDate: booking?.checkoutDate.toString().slice(0, 16),
      numberOfGuests: booking?.numberOfGuests,
      totalPrice: booking?.totalPrice,
      bookingStatus: booking?.bookingStatus,
    },
  });

  const [numberOfGuestsCount, setNumberOfGuestsCount] = useState<
    number | undefined
  >(booking?.numberOfGuests);

  const editBooking = async (booking: FormProps) => {
    try {
      const response = await fetch(
        `https://booking-api-vtw8.onrender.com/bookings/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            userId: booking.userId,
            propertyId: booking.propertyId,
            checkinDate: new Date(convertToLocal(booking.checkinDate)),
            checkoutDate: new Date(convertToLocal(booking.checkoutDate)),
            numberOfGuests: booking.numberOfGuests,
            totalPrice: booking.totalPrice,
            bookingStatus: booking.bookingStatus,
          }),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `${token}`,
          },
        }
      );

      // Get the updated booking from the response
      const updatedBooking = await response.json();

      if (updatedBooking) {
        // Fetch all bookings after the update
        const refresh = await fetch(
          `https://booking-api-vtw8.onrender.com/bookings`
        );
        const newBookings = await refresh.json();

        // Update the bookings state
        setBookings(newBookings);
        toast({
          title: "Booking updated",
          description: "Booking has been successfully updated!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={token ? onOpen : noPermission}>Edit Booking</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Booking</ModalHeader>
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

              <FormLabel htmlFor="numberOfGuests">
                Number of Guests: {numberOfGuestsCount}
              </FormLabel>
              <input
                type="range"
                min={1}
                step={1}
                max={20}
                id="numberOfGuests"
                {...register("numberOfGuests", {
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) =>
                    setNumberOfGuestsCount(e.target.valueAsNumber),
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
                <option value="canceled">Canceled</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit(editBooking)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
