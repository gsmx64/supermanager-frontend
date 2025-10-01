import { createContext } from "react";

export const SearchContext = createContext<{
  searchText: string;
  setSearchText: (value: string) => void;
}>({
  searchText: '',
  setSearchText: () => {},
});
