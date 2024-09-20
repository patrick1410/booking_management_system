import { Link } from "react-router-dom";
import { Box, UnorderedList, ListItem } from "@chakra-ui/react";
import { MdRateReview } from "react-icons/md";
import {
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaSignInAlt,
  FaBuilding,
} from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import "./css/navigation.css";

export const Navigation = () => {
  return (
    <Box gridArea="nav" as="nav">
      <UnorderedList
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly" // adjust later?
        alignItems="flex-end" // adjust later?
        height="100%"
        style={{
          listStyle: "none",
        }}
      >
        <ListItem>
          <Link to={"/login"}>
            Login <FaSignInAlt />
          </Link>
        </ListItem>
        <ListItem>
          <Link to={"/"}>
            Bookings <FaClipboardList />
          </Link>
        </ListItem>
        <ListItem>
          <Link to={"/users"}>
            Users <FaUsers />
          </Link>
        </ListItem>
        <ListItem>
          <Link to={"/hosts"}>
            Hosts <FaUserTie />
          </Link>
        </ListItem>
        <ListItem>
          <Link to={"/properties"}>
            Properties <FaBuilding />
          </Link>
        </ListItem>
        <ListItem>
          <Link to={"/reviews"}>
            Reviews <MdRateReview />
          </Link>
        </ListItem>
        <ListItem>
          <Link to={"/amenities"}>
            Amenities <FaListUl />
          </Link>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};
