import { Link } from "react-router-dom";

import { Box, UnorderedList, ListItem } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box gridArea="nav" as="nav">
      <UnorderedList
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly" // adjust later?
        alignItems="center" // adjust later?
        height="100%"
        style={{
          listStyle: "none",
        }}
      >
        <ListItem>
          <Link to={"/login"}>Login</Link>
        </ListItem>
        <ListItem>
          <Link to={"/"}>Bookings</Link>
        </ListItem>
        <ListItem>
          <Link to={"/users"}>Users</Link>
        </ListItem>
        <ListItem>
          <Link to={"/hosts"}>Hosts</Link>
        </ListItem>
        <ListItem>
          <Link to={"/properties"}>Properties</Link>
        </ListItem>
        <ListItem>
          <Link to={"/reviews"}>Reviews</Link>
        </ListItem>
        <ListItem>
          <Link to={"/amenities"}>Amenities</Link>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};
