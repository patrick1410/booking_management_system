import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../components/SearchProvider";
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

  const searchContext = useContext(SearchContext);
  const { searchTerm, setSearchTerm } = searchContext;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/reviews");
        const reviews = await response.json();
        setReviews(reviews);
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <ErrorComponent error={error} />;
  }

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
    "comment",
    "rating",
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
        <Heading as="h2" mt={{ base: 2.5, sm: 0 }}>
          Reviews Page
        </Heading>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Reviews..."
        />
        <CreateReview reviews={reviews} setReviews={setReviews} />
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
            reviews={reviews}
            setReviews={setReviews}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
