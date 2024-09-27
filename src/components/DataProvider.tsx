import { createContext, useState, useEffect, ReactNode } from "react";

// Initialize the DataContext with a default value matching the DataContextType structure
export const DataContext = createContext<DataContextType>({
  bookings: [],

  setBookings: () => {},

  searchTerm: "",
  setSearchTerm: () => {},
  loading: true,
  error: null,
});

type DataProviderProps = {
  children: ReactNode; // Accept children as ReactNode (valid JSX content)
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const response = await fetch("http://localhost:3000/bookings");
        const bookings = await response.json();

        setBookings(bookings);
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
        bookings,

        setBookings,

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
