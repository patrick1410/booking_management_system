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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { DataContext } from "../DataProvider";

type CreateReviewProps = {
  title: string;
};

type FormProps = {
  userId: string;
  propertyId: string;
  rating: number;
  comment: string;
};

export const CreateReview: React.FC<CreateReviewProps> = ({ title }) => {
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
        setReviews([newReview, ...reviews]);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>{title}</Button>
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
              <Input
                type="number"
                id="rating"
                placeholder="Enter a rating..."
                {...register("rating", {
                  required: true,
                  valueAsNumber: true,
                  validate: {
                    min: (value) => value >= 1,
                    max: (value) => value <= 5,
                  },
                })}
              />

              <FormLabel htmlFor="comment">Comment:</FormLabel>
              <Input
                type="tel"
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
