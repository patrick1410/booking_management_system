import { useContext } from "react";
import { DataContext } from "../components/DataProvider";
import {
  Box,
  Card,
  CardBody,
  Text,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";

export const ReviewsPage = () => {
  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  // Ensure dataContext is not undefined and bookings data is available
  if (!dataContext || dataContext.reviews.length === 0) {
    return <div>Loading...</div>;
  }

  const { reviews } = dataContext;

  return (
    <Box style={{ gridArea: "main", overflow: "auto" }}>
      <Heading as="h2">Reviews Page</Heading>
      <SimpleGrid columns={1} gap={8}>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardBody>
              <Text>id: {review.id}</Text>
              <Text>userId: {review.userId}</Text>
              <Text>propertyId: {review.propertyId}</Text>
              <Text>rating: {review.rating}</Text>
              <Text>comment: {review.comment}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
