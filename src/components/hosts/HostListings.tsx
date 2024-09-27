import { Box, Heading, Text } from "@chakra-ui/react";

type HostListingsProps = {
  host: Host;
};

export const HostListings: React.FC<HostListingsProps> = ({ host }) => {
  return (
    <Box>
      <Heading as="h4">
        {host.listings.length > 1 ? "Listings:" : "Listing:"}
      </Heading>
      {host.listings.map((listing) => (
        <Box mb={"0.75rem"} key={listing.id}>
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
  );
};
