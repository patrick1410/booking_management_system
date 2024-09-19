import { createContext, useState, useEffect, ReactNode } from "react";

// Initialize the DataContext with an empty default value
export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

type DataProviderProps = {
  children: ReactNode; // Accept children as ReactNode (valid JSX content)
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [hosts, setHosts] = useState<Host[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usersData,
          hostsData,
          propertiesData,
          bookingsData,
          reviewsData,
          amenitiesData,
        ] = await Promise.all([
          fetch("http://localhost:3000/users").then((res) => res.json()),
          fetch("http://localhost:3000/hosts").then((res) => res.json()),
          fetch("http://localhost:3000/properties").then((res) => res.json()),
          fetch("http://localhost:3000/bookings").then((res) => res.json()),
          fetch("http://localhost:3000/reviews").then((res) => res.json()),
          fetch("http://localhost:3000/amenities").then((res) => res.json()),
        ]);

        setUsers(usersData);
        setHosts(hostsData);
        setProperties(propertiesData);
        setBookings(bookingsData);
        setReviews(reviewsData);
        setAmenities(amenitiesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        users,
        hosts,
        properties,
        bookings,
        reviews,
        amenities,
        setUsers,
        setHosts,
        setProperties,
        setBookings,
        setReviews,
        setAmenities,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
