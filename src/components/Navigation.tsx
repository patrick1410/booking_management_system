import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  UnorderedList,
  ListItem,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
} from "@chakra-ui/react";

import { MdRateReview } from "react-icons/md";
import {
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaSignInAlt,
  FaSignOutAlt,
  FaBuilding,
} from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import "./css/navigation.css";

import { getJWT } from "../utils/getJWT";

export const Navigation = () => {
  const toast = useToast();
  const navigate = useNavigate();

  // Handles logout and removes the JWT from the localStorage
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/"); // Redirect to bookingspage
    toast({
      title: "Logged out!",
      description: "You have been successfully logged out.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const token = getJWT();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box gridArea="nav" as="nav">
      {/* Mobile menu */}
      <Box>
        <Box
          display={{ base: "flex", md: "none" }}
          justifyContent="flex-end"
          mr={8}
        >
          <HamburgerIcon
            color="#1e3a78"
            boxSize={6}
            cursor="pointer"
            onClick={onOpen}
          />
        </Box>
        <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              backgroundColor="#a7d3e0"
              color="#2a7cba"
              p={2}
              borderBottomWidth="1px"
              borderBottomColor="#f2f2f2"
            >
              Navigation menu
            </DrawerHeader>
            <DrawerBody backgroundColor="#a7d3e0">
              <UnorderedList
                display="flex"
                flexDirection="column"
                justifyContent="space-evenly"
                alignItems="flex-end"
                height="100%"
                style={{
                  listStyle: "none",
                }}
              >
                <ListItem>
                  {token ? (
                    <Link to={"/"} onClick={handleLogout}>
                      Logout <FaSignOutAlt />
                    </Link>
                  ) : (
                    <Link onClick={onClose} to={"/login"}>
                      Login <FaSignInAlt />
                    </Link>
                  )}
                </ListItem>
                <ListItem>
                  <Link onClick={onClose} to={"/"}>
                    Bookings <FaClipboardList />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link onClick={onClose} to={"/users"}>
                    Users <FaUsers />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link onClick={onClose} to={"/hosts"}>
                    Hosts <FaUserTie />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link onClick={onClose} to={"/properties"}>
                    Properties <FaBuilding />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link onClick={onClose} to={"/reviews"}>
                    Reviews <MdRateReview />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link onClick={onClose} to={"/amenities"}>
                    Amenities <FaListUl />
                  </Link>
                </ListItem>
              </UnorderedList>
            </DrawerBody>
            <DrawerCloseButton
              _hover={{ backgroundColor: "none" }}
              _active={{ backgroundColor: "none" }}
              as="div"
            >
              <CloseIcon
                boxSize={4}
                color="#1e3a78"
                cursor="pointer"
                onClick={onOpen}
              />
            </DrawerCloseButton>
          </DrawerContent>
        </Drawer>
      </Box>

      {/* Desktop menu */}
      <UnorderedList
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="flex-end"
        height="100%"
        style={{
          listStyle: "none",
        }}
      >
        <ListItem>
          {token ? (
            <Link to={"/"} onClick={handleLogout}>
              Logout <FaSignOutAlt />
            </Link>
          ) : (
            <Link onClick={onClose} to={"/login"}>
              Login <FaSignInAlt />
            </Link>
          )}
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
