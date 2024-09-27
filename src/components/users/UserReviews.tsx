import { Box, Heading, Text } from "@chakra-ui/react";

type UserReviewsProps = {
  user: User;
};

export const UserReviews: React.FC<UserReviewsProps> = ({ user }) => {
  return (
    <>
      <Box>
        <Heading as="h4">
          {user.Review.length > 1 ? "Reviews:" : "Review:"}
        </Heading>
        {user.Review.map((review) => (
          <Box mb={"0.75rem"} key={review.id}>
            <Text>
              <strong>id: </strong>
              {review.id}
            </Text>
            <Text>
              <strong>userId: </strong>
              {review.userId}
            </Text>
            <Text>
              <strong>rating: </strong> {review.rating}
            </Text>
            <Text>
              <strong>comment: </strong>
              {review.comment}
            </Text>
            <hr />
          </Box>
        ))}
      </Box>
    </>
  );
};
