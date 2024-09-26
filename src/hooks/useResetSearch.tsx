import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../components/DataProvider";

export const useResetSearch = () => {
  const location = useLocation();
  const context = useContext(DataContext);

  // Ensure context is available
  if (!context) {
    return; // Return early if !context; this should not happen if the hook is used correctly
  }

  // Extract setSearchTerm from context
  const { setSearchTerm } = context;

  useEffect(() => {
    setSearchTerm(""); // Reset searchTerm to an empty string when the route changes
  }, [location.pathname, setSearchTerm]);
};
