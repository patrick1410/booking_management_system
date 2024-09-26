import { useContext } from "react";
import { DataContext } from "../components/DataProvider";
import { Box, SimpleGrid, Heading, useToast } from "@chakra-ui/react";
import { CreateReview } from "../components/reviews/CreateReview";
import { SearchBar } from "../components/UI/SearchBar";
import { filterData } from "../utils/filterData";
import { useResetSearch } from "../hooks/useResetSearch";
import { ErrorComponent } from "../components/UI/ErrorComponent";
import { LoadingComponent } from "../components/UI/LoadingComponent";
import { getJWT } from "../utils/getJWT";
import { useNoPermission } from "../hooks/useNoPermission";
import { ReviewItem } from "../components/reviews/ReviewItem";

export const ReviewsPage = () => {
  useResetSearch(); // Reset search term when page is loaded
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

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
          headers: { Authorization: `${token}` },
        });

        if (response.ok) {
          setReviews((prev) => prev.filter((review) => review.id !== id));
          toast({
            title: "Review deleted",
            description: "The review has been successfully deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
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
        w="100%"
        display="flex"
        flexDir={{ base: "column", lg: "row" }}
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
      <SimpleGrid
        mt={2}
        columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
        gap={8}
        overflow="auto"
      >
        {orderedReviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            deleteReview={deleteReview}
            token={token}
            noPermission={noPermission}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
