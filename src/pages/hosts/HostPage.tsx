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
          <Text>
            <strong>id: </strong>
            {host.id}
          </Text>
          <Text>
            <strong>username: </strong>
            {host.username}
          </Text>
          <Text>
            <strong>email: </strong>
            {host.email}
          </Text>
          <Text>
            <strong>phone: </strong>
            {host.phoneNumber}
          </Text>
          <Text>
            <strong>about: </strong>
            {host.aboutMe}
          </Text>
        </Box>

        {host.listings.length >= 1 && (
          <Box>
            <Heading as="h4">
              {host.listings.length > 1 ? "Listings:" : "Listing:"}
            </Heading>
            {host.listings.map((listing, i) => (
              <Box mb={"0.75rem"} key={i}>
                <Heading as="h5">- {listing.title}</Heading>
                <Text>
                  <strong>id: </strong>
                  {listing.id}
                </Text>
                <Text>
                  <strong>description: </strong>
                  {listing.description}
                </Text>
                <Text>
                  <strong>location: </strong>
                  {listing.location}
                </Text>
                <Text>
                  <strong>pricePerNight: </strong>
                  {listing.pricePerNight.toString().replace(".", ",")}
                </Text>
                <Text>
                  <strong>bedroomCount: </strong>
                  {listing.bedroomCount}
                </Text>
                <Text>
                  <strong>bathRoomCount: </strong>
                  {listing.bathRoomCount}
                </Text>
                <Text>
                  <strong>maxGuestCount: </strong>
                  {listing.maxGuestCount}
                </Text>
                <Text>
                  <strong>hostId: </strong>
                  {listing.hostId}
                </Text>
                <Text>
                  <strong>rating: </strong>
                  {listing.rating}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};
