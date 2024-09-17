import { useContext } from "react";
import { DataContext } from "../components/DataProvider";
import {
  Box,
  Card,
  CardBody,
  Text,
  SimpleGrid,
  Heading,
  Button,
} from "@chakra-ui/react";
import { CreateReview } from "../components/reviews/CreateReview";

export const ReviewsPage = () => {
  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.reviews.length === 0) {
    return <div>Loading...</div>;
  }

  const { reviews, setReviews } = dataContext;

  const deleteReview = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the review?")) {
        const response = await fetch(`http://localhost:3000/reviews/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setReviews((prev) => prev.filter((review) => review.id !== id));
        }
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <Box style={{ gridArea: "main", overflow: "auto" }}>
      <Box w="50%" display="flex" justifyContent="space-between">
        <Heading as="h2">Reviews Page</Heading>
        <CreateReview title="Create Review" />
      </Box>
      <SimpleGrid columns={1} gap={8}>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardBody>
              <Text>id: {review.id}</Text>
              <Text>userId: {review.userId}</Text>
              <Text>propertyId: {review.propertyId}</Text>
              <Text>rating: {review.rating}</Text>
              <Text>comment: {review.comment}</Text>
              <Button onClick={() => deleteReview(review.id)}>
                Delete Review
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
