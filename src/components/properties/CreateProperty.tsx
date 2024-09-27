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
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { getJWT } from "../../utils/getJWT";
import { useNoPermission } from "../../hooks/useNoPermission";

type CreatePropertyProps = {
  amenities: Amenity[];
  properties: Property[];
  setProperties: (properties: Property[]) => void;
};

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

export const CreateProperty: React.FC<CreatePropertyProps> = ({
  amenities,
  properties,
  setProperties,
}) => {
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<FormProps>({});
  const [bedroomCount, setBedroomCount] = useState<number>(1);
  const [bathRoomCount, setBathRoomCount] = useState<number>(1);
  const [maxGuestCount, setMaxGuestCount] = useState<number>(1);

  const createProperty = async (property: FormProps) => {
    try {
      const response = await fetch("http://localhost:3000/properties", {
        method: "POST",
        body: JSON.stringify({
          ...property,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `${token}`,
        },
      });

      const newProperty = await response.json();
      if (setProperties) {
        setProperties([...properties, newProperty]);
        toast({
          title: "Property created",
          description: "Property has been successfully created!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={token ? onOpen : noPermission}>Create Property</Button>
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

              <FormLabel htmlFor="bedroomCount">
                Bedroom Count: {bedroomCount}
              </FormLabel>
              <input
                defaultValue={1}
                min={1}
                max={10}
                step={1}
                type="range"
                id="bedroomCount"
                {...register("bedroomCount", {
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) => setBedroomCount(e.target.valueAsNumber),
                })}
              />

              <FormLabel htmlFor="bathRoomCount">
                Bathroom Count: {bathRoomCount}
              </FormLabel>
              <input
                defaultValue={1}
                min={1}
                max={10}
                step={1}
                type="range"
                id="bathRoomCount"
                {...register("bathRoomCount", {
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) => setBathRoomCount(e.target.valueAsNumber),
                })}
              />

              <FormLabel htmlFor="maxGuestCount">
                Max Guest Count: {maxGuestCount}
              </FormLabel>
              <input
                type="range"
                defaultValue={1}
                min={1}
                max={20}
                step={1}
                id="maxGuestCount"
                {...register("maxGuestCount", {
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) => setMaxGuestCount(e.target.valueAsNumber),
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
