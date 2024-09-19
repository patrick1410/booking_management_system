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
    <InputGroup w="30%">
      <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
      <Input
        pl="2rem !important"
        type="text"
        placeholder={placeholder}
        onChange={onSearchChange}
        value={searchTerm}
      />
    </InputGroup>
  );
};
