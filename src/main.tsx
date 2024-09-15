import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { BookingsPage } from "./pages/bookings/BookingsPage";
import { AmenitiesPage } from "./pages/amenities/AmenitiesPage";
import { LoginPage } from "./pages/LoginPage";
import { HostsPage } from "./pages/hosts/HostsPage";
import { UsersPage } from "./pages/users/UsersPage";
import { ReviewsPage } from "./pages/reviews/ReviewsPage";
import { PropertiesPage } from "./pages/properties/PropertiesPage";

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
        path: "/hosts",
        element: <HostsPage />,
      },
      {
        path: "/properties",
        element: <PropertiesPage />,
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

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
