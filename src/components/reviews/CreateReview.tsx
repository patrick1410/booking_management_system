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
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { getJWT } from "../../utils/getJWT";
import { useNoPermission } from "../../hooks/useNoPermission";

type CreateReviewProps = {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
};

type FormProps = {
  userId: string;
  propertyId: string;
  rating: number;
  comment: string;
};

export const CreateReview: React.FC<CreateReviewProps> = ({
  reviews,
  setReviews,
}) => {
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<FormProps>({});

  const CreateReview = async (review: FormProps) => {
    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        body: JSON.stringify({
          ...review,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `${token}`,
        },
      });

      const newReview = await response.json();
      if (setReviews) {
        setReviews([...reviews, newReview]);
        toast({
          title: "Review created",
          description: "Review has been successfully created!",
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
      <Button onClick={token ? onOpen : noPermission}>Create Review</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Review</ModalHeader>
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
            <Button onClick={handleSubmit(CreateReview)} variant="ghost">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
