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
  Textarea,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { DataContext } from "../DataProvider";

type FormProps = {
  userId: string;
  propertyId: string;
  rating: number;
  comment: string;
};

export const CreateReview = () => {
  const dataContext = useContext(DataContext);
  const { reviews = [], setReviews = () => {} } = dataContext || {}; // Default to empty array and noop function

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormProps>({});

  const CreateReview = async (review: FormProps) => {
    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        body: JSON.stringify({
          ...review,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      const newReview = await response.json();
      if (setReviews) {
        setReviews([...reviews, newReview]);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Create Review</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Review</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl as="form">
              <FormLabel htmlFor="userId">UserId:</FormLabel>
              <Input
                type="text"
                id="userId"
                placeholder="Enter an userId..."
                {...register("userId", { required: true })}
              />
              <FormLabel htmlFor="propertyId">PropertyId:</FormLabel>
              <Input
                type="text"
                id="propertyId"
                placeholder="Enter a propertyId..."
                {...register("propertyId", { required: true })}
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

              <FormLabel htmlFor="comment">Comment:</FormLabel>
              <Textarea
                id="comment"
                placeholder="Enter a comment..."
                {...register("comment", { required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit(CreateReview)} variant="ghost">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
