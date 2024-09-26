import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; // Allow setting a custom placeholder
};

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder,
}) => {
  return (
    <InputGroup
      w={{ base: "100%", sm: "60%", md: "50%", lg: "30%" }}
      mb={{ base: "10px", lg: "0px" }}
    >
      <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
      <Input
        pl="2rem"
        type="text"
        placeholder={placeholder}
        onChange={onSearchChange}
        value={searchTerm}
      />
    </InputGroup>
  );
};
