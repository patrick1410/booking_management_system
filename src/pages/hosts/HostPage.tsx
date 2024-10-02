import { Box, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingComponent } from "../../components/UI/LoadingComponent";
import { ErrorComponent } from "../../components/UI/ErrorComponent";
import { HostDetails } from "../../components/hosts/HostDetails";
import { HostListings } from "../../components/hosts/HostListings";

export const HostPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [host, setHost] = useState<Host | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHost = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/hosts/${id}`);
        const hostData = await response.json();
        setHost(hostData);
      } catch (error) {
        console.error("Error fetching host:", error);
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

  if (loading || !host) {
    return <LoadingComponent resource="host" />;
  }

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <SimpleGrid columns={1} overflow="auto">
        <HostDetails host={host} />

        {host.listings.length >= 1 && <HostListings host={host} />}
      </SimpleGrid>
    </Box>
  );
};
