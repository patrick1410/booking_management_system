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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { DataContext } from "../DataProvider";

type EditAmenityProps = {
  id: string; // The id of the amenity being edited
};

// Optimize
// type FormProps = Amenity;

type FormProps = Amenity;

export const EditAmenity: React.FC<EditAmenityProps> = ({ id }) => {
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
        },
      });

      const updatedAmenity = await response.json();

      if (setAmenities) {
        setAmenities(
          amenities.map((amenity) =>
            amenity.id === updatedAmenity.id ? updatedAmenity : amenity
          )
        );
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Edit Amenity</Button>

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
