import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../components/SearchProvider";
import { Box, SimpleGrid, Heading, useToast } from "@chakra-ui/react";
import { CreateProperty } from "../../components/properties/CreateProperty";
import { SearchBar } from "../../components/UI/SearchBar";
import { filterData } from "../../utils/filterData";
import { useResetSearch } from "../../hooks/useResetSearch";
import { ErrorComponent } from "../../components/UI/ErrorComponent";
import { LoadingComponent } from "../../components/UI/LoadingComponent";
import { getJWT } from "../../utils/getJWT";
import { useNoPermission } from "../../hooks/useNoPermission";
import { PropertyItem } from "../../components/properties/PropertyItem";

export const PropertiesPage = () => {
  useResetSearch(); // Reset search term when page is loaded
  const noPermission = useNoPermission();
  const toast = useToast();
  const token = getJWT(); // Get token

  // Use the useContext hook to access context data
  const searchContext = useContext(SearchContext);

  const { searchTerm, setSearchTerm } = searchContext;

  const [properties, setProperties] = useState<Property[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const [propertiesData, amenitiesData] = await Promise.all([
          fetch("http://localhost:3000/properties").then((res) => res.json()),
          fetch("http://localhost:3000/amenities").then((res) => res.json()),
        ]);
        setProperties(propertiesData);
        setAmenities(amenitiesData);
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
    return <LoadingComponent resource="properties" />;
  }

  const deleteProperty = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete the property?")) {
        const response = await fetch(`http://localhost:3000/properties/${id}`, {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        });

        if (response.ok) {
          setProperties((prev) =>
            prev.filter((property) => property.id !== id)
          );
          toast({
            title: "Property deleted",
            description: "The property has been successfully deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const filteredProperties = filterData(properties, searchTerm, [
    "title",
    "description",
    "location",
    "hostId",
  ]);

  const orderedProperties = [...filteredProperties].reverse(); // New properties first!

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
          Properties Page
        </Heading>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Properties..."
        />
        <CreateProperty
          amenities={amenities}
          properties={properties}
          setProperties={setProperties}
        />
      </Box>
      <SimpleGrid
        mt={2}
        columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
        gap={8}
        overflow="auto"
      >
        {orderedProperties.map((property) => (
          <PropertyItem
            key={property.id}
            property={property}
            deleteProperty={deleteProperty}
            token={token}
            noPermission={noPermission}
            amenities={amenities}
            properties={properties}
            setProperties={setProperties}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
