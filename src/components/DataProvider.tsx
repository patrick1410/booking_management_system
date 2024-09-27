import { createContext, useState, ReactNode } from "react";

// Initialize the DataContext with a default value matching the DataContextType structure
export const DataContext = createContext<DataContextType>({
  searchTerm: "",
  setSearchTerm: () => {},
});

type DataProviderProps = {
  children: ReactNode; // Accept children as ReactNode (valid JSX content)
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <DataContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
