import { Header } from "./components/UI/Header";
import { Footer } from "./components/UI/Footer";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box className="root">
      <Header title={"Booking Management System"} />
      <Navigation />
      <Outlet />
      <Footer />
    </Box>
  );
};
