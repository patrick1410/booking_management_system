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
  Box,
  SimpleGrid,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { DataContext } from "../DataProvider";

type FormProps = {
  title: string;
  description: string;
  location: string;
  pricePerNight: number;
  bedroomCount: number;
  bathRoomCount: number;
  maxGuestCount: number;
  hostId: string;
  rating: number;
  amenityIds: string[];
};

export const CreateProperty = () => {
  const dataContext = useContext(DataContext);
  const {
    amenities,
    properties = [],
    setProperties = () => {},
  } = dataContext || {}; // Default to empty array and noop function

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<FormProps>({});

  const createProperty = async (property: FormProps) => {
    try {
      const response = await fetch("http://localhost:3000/properties", {
        method: "POST",
        body: JSON.stringify({
          ...property,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      const newProperty = await response.json();
      if (setProperties) {
        setProperties([...properties, newProperty]);
      }

      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Create Property</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH="80vh" overflow="auto">
          <ModalHeader>Create Property</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl as="form">
              <FormLabel htmlFor="title">Title:</FormLabel>
              <Input
                type="text"
                id="title"
                placeholder="Enter the property title..."
                {...register("title", { required: true })}
              />

              <FormLabel htmlFor="description">Description:</FormLabel>
              <Input
                type="text"
                id="description"
                placeholder="Enter the property description..."
                {...register("description", { required: true })}
              />

              <FormLabel htmlFor="location">Location:</FormLabel>
              <Input
                type="text"
                id="location"
                placeholder="Enter the property location..."
                {...register("location", { required: true })}
              />

              <FormLabel htmlFor="pricePerNight">Price per Night:</FormLabel>
              <Input
                type="number"
                id="pricePerNight"
                placeholder="Enter the price per night..."
                step="0.01"
                {...register("pricePerNight", {
                  required: true,
                  valueAsNumber: true,
                })}
              />

              <FormLabel htmlFor="bedroomCount">Bedroom Count:</FormLabel>
              <Input
                type="number"
                id="bedroomCount"
                placeholder="Enter the number of bedrooms..."
                {...register("bedroomCount", {
                  required: true,
                  valueAsNumber: true,
                })}
              />

              <FormLabel htmlFor="bathRoomCount">Bathroom Count:</FormLabel>
              <Input
                type="number"
                id="bathRoomCount"
                placeholder="Enter the number of bathrooms..."
                {...register("bathRoomCount", {
                  required: true,
                  valueAsNumber: true,
                })}
              />

              <FormLabel htmlFor="maxGuestCount">Max Guest Count:</FormLabel>
              <Input
                type="number"
                id="maxGuestCount"
                placeholder="Enter the maximum number of guests..."
                {...register("maxGuestCount", {
                  required: true,
                  valueAsNumber: true,
                })}
              />

              <FormLabel htmlFor="hostId">Host Id:</FormLabel>
              <Input
                type="text"
                id="hostId"
                placeholder="Enter the host id..."
                {...register("hostId", { required: true })}
              />

              <FormLabel htmlFor="rating">Rating:</FormLabel>
              <Select
                id="rating"
                {...register("rating", { required: true, valueAsNumber: true })}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Select>
              <FormLabel>Amenities:</FormLabel>
              <SimpleGrid columns={3} gap={2}>
                {amenities?.map((amenity, i) => (
                  <Box key={i}>
                    <input
                      type="checkbox"
                      id="amenityIds"
                      value={amenity.id}
                      {...register("amenityIds", { required: true })}
                    />
                    <label className="checkbox-label" htmlFor="amenityIds">
                      {amenity.name}
                    </label>
                  </Box>
                ))}
              </SimpleGrid>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit(createProperty)} variant="ghost">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
