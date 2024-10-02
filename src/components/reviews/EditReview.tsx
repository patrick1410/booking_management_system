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
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { getJWT } from "../../utils/getJWT";
import { useNoPermission } from "../../hooks/useNoPermission";

type EditReviewProps = {
  id: string;
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
};

type FormProps = Review;

export const EditReview: React.FC<EditReviewProps> = ({
  id,
  reviews,
  setReviews,
}) => {
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

  // Find the review by id
  const review = reviews.find((review) => review.id === id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      userId: review?.userId,
      propertyId: review?.propertyId,
      rating: review?.rating,
      comment: review?.comment,
    },
  });

  const editReview = async (review: FormProps) => {
    try {
      const response = await fetch(`http://localhost:3000/reviews/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...review,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `${token}`,
        },
      });

      // Get the updated review from the response
      const updatedReview = await response.json();

      if (updatedReview) {
        // Fetch all reviews after the update
        const refresh = await fetch(`http://localhost:3000/reviews`);
        const newReviews = await refresh.json();

        // Update the reviews state
        setReviews(newReviews);
        toast({
          title: "Review updated",
          description: "Review has been successfully updated!",
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
      <Button onClick={token ? onOpen : noPermission}>Edit Review</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="form">
              <FormLabel htmlFor="userId">User Id:</FormLabel>
              <Input
                type="text"
                id="userId"
                placeholder="Enter an user id..."
                {...register("userId", { required: true })}
              />
              <FormLabel htmlFor="propertyId">Property Id:</FormLabel>
              <Input
                type="text"
                id="propertyId"
                placeholder="Enter a property id..."
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
            <Button variant="ghost" onClick={handleSubmit(editReview)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
