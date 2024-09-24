import { Heading, Text, Box, SimpleGrid, Avatar } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const HostPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [host, setHost] = useState<Host | null>(null);

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/hosts/${id}`);
        const hostData = await response.json();
        setHost(hostData);
      } catch (error) {
        console.error("Error fetching host:", error);
      }
    };

    fetchHost();
  }, []);

  if (!host) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <Box gridArea="main" display="flex" flexDir="column">
      <SimpleGrid columns={1} overflow="auto">
        <Box display="flex" alignItems="center">
          <Avatar src={host.profilePicture} name={host.name} />
          <Heading ml="0.5rem !important" as="h3">
            {host.name}'s Details:
          </Heading>
        </Box>

        <Box>
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
              <Box sx={{ mb: "0.75rem !important " }} key={i}>
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
