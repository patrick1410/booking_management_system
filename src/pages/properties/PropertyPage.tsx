import { Box, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingComponent } from "../../components/UI/LoadingComponent";
import { ErrorComponent } from "../../components/UI/ErrorComponent";
import { PropertyDetails } from "../../components/properties/PropertyDetails";
import { PropertyReviews } from "../../components/properties/PropertyReviews";
import { PropertyBookings } from "../../components/properties/PropertyBookings";

export const PropertyPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHost = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/properties/${id}`);
        const propertyData = await response.json();
        setProperty(propertyData);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHost();
  }, []);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (loading || !property) {
    return <LoadingComponent resource="property" />;
  }

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <SimpleGrid columns={1} overflow="auto">
        <PropertyDetails property={property} />

        {property.reviews.length >= 1 && (
          <PropertyReviews property={property} />
        )}

        {property.bookings.length >= 1 && (
          <PropertyBookings property={property} />
        )}
      </SimpleGrid>
    </Box>
  );
};
