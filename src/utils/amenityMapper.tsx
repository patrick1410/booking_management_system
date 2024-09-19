// Define the type for the amenityMap
type AmenityMap = {
  [key: string]: string;
};

// Function to create a map of amenities
export const createAmenityMap = (amenities: Amenity[]): AmenityMap => {
  const amenityMap: AmenityMap = {};

  amenities.forEach((amenity) => {
    amenityMap[amenity.id] = amenity.name;
  });

  return amenityMap;
};
