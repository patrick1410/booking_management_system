import { useContext, useState, useEffect } from "react";
import { DataContext } from "../components/DataProvider";
import { Box, SimpleGrid, Heading, useToast } from "@chakra-ui/react";
import { CreateAmenity } from "../components/amenities/CreateAmenity";
import { SearchBar } from "../components/UI/SearchBar";
import { filterData } from "../utils/filterData";
import { useResetSearch } from "../hooks/useResetSearch";
import { ErrorComponent } from "../components/UI/ErrorComponent";
import { LoadingComponent } from "../components/UI/LoadingComponent";
import { getJWT } from "../utils/getJWT";
import { useNoPermission } from "../hooks/useNoPermission";
import { AmenityItem } from "../components/amenities/AmenityItem";

export const AmenitiesPage = () => {
  useResetSearch(); // Reset search term when page is loaded
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

  // Use the useContext hook to access context data
  const dataContext = useContext(DataContext);

  const { searchTerm, setSearchTerm } = dataContext;

  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/amenities");
        const amenities = await response.json();
        setAmenities(amenities);
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle error starte
  if (error) {
    return <ErrorComponent error={error} />;
  }

  // Handle loading state
  if (loading) {
    return <LoadingComponent resource="amenities" />;
  }

  const deleteAmenity = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the amenity?")) {
        const response = await fetch(`http://localhost:3000/amenities/${id}`, {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        });

        if (response.ok) {
          setAmenities((prev) => prev.filter((amenity) => amenity.id !== id));
          toast({
            title: "Amenity deleted",
            description: "The amenity has been successfully deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.error("Error deleting amenity:", error);
    }
  };

  const filteredAmenities = filterData(amenities, searchTerm, ["name"]);

  const orderedAmenities = [...filteredAmenities].reverse(); // New amenities first!

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
          Amenities Page
        </Heading>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Amenities..."
        />
        <CreateAmenity amenities={amenities} setAmenities={setAmenities} />
      </Box>
      <SimpleGrid
        mt={2}
        columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
        gap={8}
        overflow="auto"
      >
        {orderedAmenities.map((amenity) => (
          <AmenityItem
            key={amenity.id}
            amenity={amenity}
            deleteAmenity={deleteAmenity}
            token={token}
            noPermission={noPermission}
            amenities={amenities}
            setAmenities={setAmenities}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
