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
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { getJWT } from "../../utils/getJWT";
import { useNoPermission } from "../../hooks/useNoPermission";

type EditAmenityProps = {
  id: string;
  amenities: Amenity[];
  setAmenities: (amenities: Amenity[]) => void;
};

type FormProps = Amenity;

export const EditAmenity: React.FC<EditAmenityProps> = ({
  id,
  amenities,
  setAmenities,
}) => {
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

  // Find the amenity by id
  const amenity = amenities.find((amenity) => amenity.id === id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: { name: amenity?.name },
  });

  const editAmenity = async (amenity: FormProps) => {
    try {
      const response = await fetch(
        `https://booking-api-vtw8.onrender.com/amenities/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...amenity,
          }),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `${token}`,
          },
        }
      );

      // Get the updated amenity from the response
      const updatedAmenity = await response.json();

      if (updatedAmenity) {
        // Fetch all amenities after the update
        const refresh = await fetch(
          `https://booking-api-vtw8.onrender.com/amenities`
        );
        const newAmenities = await refresh.json();

        // Update the bookings state
        setAmenities(newAmenities);
        toast({
          title: "Amenity updated",
          description: "Amenity has been successfully updated!",
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
      <Button onClick={token ? onOpen : noPermission}>Edit Amenity</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Amenity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="form">
              <FormLabel htmlFor="name">Name:</FormLabel>
              <Input
                type="text"
                id="name"
                placeholder="Enter a name..."
                {...register("name", { required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit(editAmenity)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
