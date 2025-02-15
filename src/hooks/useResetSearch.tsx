import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../components/SearchProvider";

export const useResetSearch = () => {
  const location = useLocation();
  const context = useContext(SearchContext);

  // Ensure context is available
  if (!context) {
    return; // Return early if !context;
  }

  // Extract setSearchTerm from context
  const { setSearchTerm } = context;

  useEffect(() => {
    setSearchTerm(""); // Reset searchTerm to an empty string when the route changes
  }, [location.pathname, setSearchTerm]);
};
