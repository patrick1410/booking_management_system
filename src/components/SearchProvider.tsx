import { createContext, useState, ReactNode } from "react";

// Initialize the DataContext with a default value matching the DataContextType structure
export const SearchContext = createContext<SearchContextType>({
  searchTerm: "",
  setSearchTerm: () => {},
});

type SearchProviderProps = {
  children: ReactNode; // Accept children as ReactNode (valid JSX content)
};

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
