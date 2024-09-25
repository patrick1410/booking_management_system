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
import { EditReview } from "../components/reviews/EditReview";
import { SearchBar } from "../components/UI/SearchBar";
import { filterData } from "../utils/filterData";
import { useResetSearchTerm } from "../hooks/ResetSearchTerm";
import { Link } from "react-router-dom";
import { ErrorComponent } from "../components/UI/ErrorComponent";
import { LoadingComponent } from "../components/UI/LoadingComponent";

export const ReviewsPage = () => {
  useResetSearchTerm(); // Reset search term when page is loaded

  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  const { reviews, setReviews, searchTerm, setSearchTerm, error, loading } =
    dataContext;

  // Handle error starte
  if (error) {
    return <ErrorComponent error={error} />;
  }

  // Handle loading state
  if (loading) {
    return <LoadingComponent resource="reviews" />;
  }

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

  const filteredReviews = filterData(reviews, searchTerm, [
    "userId",
    "propertyId",
  ]);

  const orderedReviews = [...filteredReviews].reverse(); // New reviews first!

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <Box
        w="80%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2">Reviews Page</Heading>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Reviews..."
        />
        <CreateReview />
      </Box>
      <SimpleGrid mt={2} columns={2} gap={8} overflow="auto">
        {orderedReviews.map((review) => (
          <Card key={review.id}>
            <CardBody>
              <Text>id: {review.id}</Text>
              <Text>
                <Link to={`/users/${review.userId}`}>
                  userId: {review.userId}
                </Link>
              </Text>
              <Text>
                <Link to={`/properties/${review.propertyId}`}>
                  propertyId: {review.propertyId}
                </Link>
              </Text>
              <Text>rating: {review.rating}</Text>
              <Text>comment: {review.comment}</Text>
              <Button onClick={() => deleteReview(review.id)}>
                Delete Review
              </Button>
              <EditReview id={review.id} />
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
