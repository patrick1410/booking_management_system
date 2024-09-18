import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchBar = () => {
  return (
    <InputGroup w="30%">
      <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
      <Input pl="2rem !important" type="text" placeholder="Search items..." />
    </InputGroup>
  );
};
