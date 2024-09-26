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
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { getJWT } from "../../utils/getJWT";
import { useNoPermission } from "../../hooks/useNoPermission";

type EditAmenityProps = {
  id: string; // The id of the amenity being edited
};

type FormProps = Amenity; // FormProps is set to Amenity type

export const EditAmenity: React.FC<EditAmenityProps> = ({ id }) => {
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

  const dataContext = useContext(DataContext);
  const { amenities = [], setAmenities = () => {} } = dataContext || {}; // Default to empty array and noop function

  // Find the amenity by id
  const amenity = amenities.find((amenity) => amenity.id === id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: { name: amenity?.name },
  });

  const editAmenity = async (amenity: FormProps) => {
    try {
      const response = await fetch(`http://localhost:3000/amenities/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...amenity,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `${token}`,
        },
      });

      // Get the updated amenity from the response
      const updatedAmenity = await response.json();

      if (updatedAmenity) {
        // Fetch all amenities after the update
        const refresh = await fetch(`http://localhost:3000/amenities`);
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
