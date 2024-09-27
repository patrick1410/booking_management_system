import { Link } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

type PropertyReviewsProps = {
  property: Property;
};

export const PropertyReviews: React.FC<PropertyReviewsProps> = ({
  property,
}) => {
  return (
    <Box>
      <Heading as="h4">
        {property.reviews.length > 1 ? "Reviews:" : "Review:"}
      </Heading>
      {property.reviews.map((review) => (
        <Box mb={"0.75rem"} key={review.id}>
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
            <strong>rating: </strong>
            {review.rating}
          </Text>
          <Text>
            <strong>comment: </strong>
            {review.comment}
          </Text>
          <hr />
        </Box>
      ))}
    </Box>
  );
};
