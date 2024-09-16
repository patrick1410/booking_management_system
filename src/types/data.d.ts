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
};

type Booking = {
  id: string;
  userId: string;
  propertyId: string;
  checkinDate: string;
  checkoutDate: string;
  numberOfGuests: number;
  totalPrice: number;
  bookingStatus: string;
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
};

// Define the context type
type DataContextType = {
  users: User[];
  hosts: Host[];
  bookings: Booking[];
  reviews: Review[];
  amenities: Amenity[];
  properties: Property[];
};
