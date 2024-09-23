// Define types
type User = {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
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
type DataContextType = {
  users: User[];
  hosts: Host[];
  bookings: Booking[];
  reviews: Review[];
  amenities: Amenity[];
  properties: Property[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setHosts: React.Dispatch<React.SetStateAction<Host[]>>;
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  setAmenities: React.Dispatch<React.SetStateAction<Amenity[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};
