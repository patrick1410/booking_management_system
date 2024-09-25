import { Heading, Text, Box, SimpleGrid, Avatar } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingComponent } from "../../components/UI/LoadingComponent";
import { ErrorComponent } from "../../components/UI/ErrorComponent";

export const HostPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [host, setHost] = useState<Host | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHost = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

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
        <Box display="flex" alignItems="center">
          <Avatar src={host.profilePicture} name={host.name} />
          <Heading ml="0.5rem" as="h3">
            {host.name}'s Details:
          </Heading>
        </Box>

        <Box mb={"0.75rem"}>
          <Text>Id: {host.id}</Text>
          <Text>Username: {host.username}</Text>
          <Text>Email: {host.email}</Text>
          <Text>Phone: {host.phoneNumber}</Text>
          <Text>About: {host.aboutMe}</Text>
        </Box>

        {host.listings.length >= 1 && (
          <Box>
            <Heading as="h4">
              {host.listings.length > 1 ? "Listings:" : "Listing:"}
            </Heading>
            {host.listings.map((listing, i) => (
              <Box mb={"0.75rem"} key={i}>
                <Heading as="h5">- {listing.title}</Heading>
                <Text>id: {listing.id}</Text>
                <Text>description: {listing.description}</Text>
                <Text>location: {listing.location}</Text>
                <Text>
                  pricePerNight:{" "}
                  {listing.pricePerNight.toString().replace(".", ",")}
                </Text>
                <Text>bedroomCount: {listing.bedroomCount}</Text>
                <Text>bathRoomCount: {listing.bathRoomCount}</Text>
                <Text>maxGuestCount: {listing.maxGuestCount}</Text>
                <Text>hostId: {listing.hostId}</Text>
                <Text>rating: {listing.rating}</Text>
              </Box>
            ))}
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};
