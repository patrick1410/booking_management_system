import { createContext, useState, useEffect, ReactNode } from "react";

// Initialize the DataContext with a default value matching the DataContextType structure
export const DataContext = createContext<DataContextType>({
  properties: [],
  bookings: [],
  amenities: [],
  setProperties: () => {},
  setBookings: () => {},
  setAmenities: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  loading: true,
  error: null,
});

type DataProviderProps = {
  children: ReactNode; // Accept children as ReactNode (valid JSX content)
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const [propertiesData, bookingsData, amenitiesData] = await Promise.all(
          [
            fetch("http://localhost:3000/properties").then((res) => res.json()),
            fetch("http://localhost:3000/bookings").then((res) => res.json()),
            fetch("http://localhost:3000/amenities").then((res) => res.json()),
          ]
        );

        setProperties(propertiesData);
        setBookings(bookingsData);
        setAmenities(amenitiesData);
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        properties,
        bookings,
        amenities,
        setProperties,
        setBookings,
        setAmenities,
        searchTerm,
        setSearchTerm,
        loading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
