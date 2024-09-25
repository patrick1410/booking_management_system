import { Link } from "react-router-dom";
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
} from "@chakra-ui/react";

import { MdRateReview } from "react-icons/md";
import {
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaSignInAlt,
  FaBuilding,
} from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import "./css/navigation.css";

export const Navigation = () => {
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
          <IoMdMenu
            color="#1e3a78"
            size={24}
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
            </DrawerBody>
            <DrawerCloseButton
              _hover={{ backgroundColor: "none" }}
              _active={{ backgroundColor: "none" }}
              as="div"
            >
              <IoMdMenu
                color="#1e3a78"
                size={24}
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
