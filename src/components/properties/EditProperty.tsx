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
import { useContext, useState } from "react";
import { DataContext } from "../DataProvider";
import { getJWT } from "../../utils/getJWT";
import { useNoPermission } from "../../hooks/useNoPermission";

type EditPropertyProps = {
  id: string; // The id of the host being edited
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

export const EditProperty: React.FC<EditPropertyProps> = ({ id }) => {
  const toast = useToast();
  const noPermission = useNoPermission();
  const token = getJWT(); // Get token

  const dataContext = useContext(DataContext);
  const {
    amenities,
    properties = [],
    setProperties = () => {},
  } = dataContext || {}; // Default to empty array and noop function

  // Find the host by id
  const property = properties.find((property) => property.id === id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      title: property?.title,
      description: property?.description,
      location: property?.location,
      pricePerNight: property?.pricePerNight,
      bedroomCount: property?.bedroomCount,
      bathRoomCount: property?.bathRoomCount,
      maxGuestCount: property?.maxGuestCount,
      hostId: property?.hostId,
      rating: property?.rating,
      amenityIds: property?.amenities.map(({ id }) => id),
    },
  });

  const [bedroomCount, setBedroomCount] = useState<number | undefined>(
    property?.bedroomCount
  );
  const [bathRoomCount, setBathRoomCount] = useState<number | undefined>(
    property?.bathRoomCount
  );
  const [maxGuestCount, setMaxGuestCount] = useState<number | undefined>(
    property?.maxGuestCount
  );

  const editProperty = async (property: FormProps) => {
    try {
      const response = await fetch(`http://localhost:3000/properties/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...property,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `${token}`,
        },
      });

      // Get the updated property from the response
      const updatedProperty = await response.json();

      if (updatedProperty) {
        // Fetch all properties after the update
        const refresh = await fetch(`http://localhost:3000/properties`);
        const newProperties = await refresh.json();

        // Update the properties state
        setProperties(newProperties);
        toast({
          title: "Property updated",
          description: "Property has been successfully updated!",
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
      <Button onClick={token ? onOpen : noPermission}>Edit Property</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH="80vh" overflow="auto">
          <ModalHeader>Edit Property</ModalHeader>
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
                type="range"
                min={1}
                step={1}
                max={10}
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
                min={1}
                step={1}
                max={10}
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
                min={1}
                step={1}
                max={20}
                type="range"
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
            <Button onClick={handleSubmit(editProperty)} variant="ghost">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
