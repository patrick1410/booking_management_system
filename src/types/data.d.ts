// Define types
type User = {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;

  Review: Review[];
  Booking: Booking[];
};

type Host = {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  aboutMe: string;

  listings: Property[];
};

type Booking = {
  id: string;
  userId: string;
  propertyId: string;
  checkinDate: Date | string;
  checkoutDate: Date | string;
  numberOfGuests: number;
  totalPrice: number;
  bookingStatus: "pending" | "confirmed" | "canceled";
};

type Review = {
  id: string;
  userId: string;
  propertyId: string;
  rating: number;
  comment: string;
};

type Amenity = {
  id: string;
  name: string;
};

type Property = {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerNight: number;
  bedroomCount: number;
  bathRoomCount: number;
  maxGuestCount: number;
  hostId: string;
  rating: number;
  amenityIds: string[];

  amenities: Amenity[];
  reviews: Review[];
  bookings: Booking[];
};

// Define the context type
type SearchContextType = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};
