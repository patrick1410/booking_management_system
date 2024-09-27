import { Link } from "react-router-dom";
import { Card, CardBody, Text, Box, Button } from "@chakra-ui/react";
import { EditReview } from "./EditReview";

type ReviewItemProps = {
  review: Review;
  deleteReview: (id: string) => void;
  token: string | null;
  noPermission: () => void;
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
};

export const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  deleteReview,
  token,
  noPermission,
  reviews,
  setReviews,
}) => {
  return (
    <Card key={review.id}>
      <CardBody display="flex" flexDir="column" justifyContent="center">
        <Text>
          <strong>id: </strong>
          {review.id}
        </Text>
        <Text>
          <Link to={`/users/${review.userId}`}>
            <strong>userId: </strong>
            {review.userId}
          </Link>
        </Text>
        <Text>
          <Link to={`/properties/${review.propertyId}`}>
            <strong>propertyId: </strong>
            {review.propertyId}
          </Link>
        </Text>
        <Text>
          <strong>rating: </strong>
          {review.rating}
        </Text>
        <Text>
          <strong>comment: </strong>
          {review.comment}
        </Text>
        <Box mt={2}>
          <Button
            mr={4}
            onClick={token ? () => deleteReview(review.id) : noPermission}
          >
            Delete Review
          </Button>
          <EditReview
            reviews={reviews}
            setReviews={setReviews}
            id={review.id}
          />
        </Box>
      </CardBody>
    </Card>
  );
};
