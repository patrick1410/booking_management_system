// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { BookingsPage } from "./pages/BookingsPage";
import { AmenitiesPage } from "./pages/AmenitiesPage";
import { LoginPage } from "./pages/LoginPage";
import { HostsPage } from "./pages/hosts/HostsPage";
import { HostPage } from "./pages/hosts/HostPage";
import { UsersPage } from "./pages/users/UsersPage";
import { UserPage } from "./pages/users/UserPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { PropertiesPage } from "./pages/properties/PropertiesPage";
import { PropertyPage } from "./pages/properties/PropertyPage";
import { DataProvider } from "./components/DataProvider";

// Define your theme
const theme = extendTheme({
  styles: {
    global: {
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      a: {
        color: "#1e3a78",
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <BookingsPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/:id",
        element: <UserPage />,
      },
      {
        path: "/hosts",
        element: <HostsPage />,
      },
      {
        path: "/hosts/:id",
        element: <HostPage />,
      },
      {
        path: "/properties",
        element: <PropertiesPage />,
      },
      {
        path: "/properties/:id",
        element: <PropertyPage />,
      },
      {
        path: "/reviews",
        element: <ReviewsPage />,
      },
      {
        path: "/amenities",
        element: <AmenitiesPage />,
      },
    ],
  },
]);

// StrictMode causes double data render in development

createRoot(document.getElementById("app")!).render(
  // <StrictMode>
  <ChakraProvider theme={theme}>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </ChakraProvider>
  // </StrictMode>
);
