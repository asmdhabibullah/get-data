import React, { useEffect, useState } from "react";
import Box from "../Box";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import StyledSearchBox from "./SearchBoxStyle";

export interface SearchBoxProps {
  books?: any[];
  setResultList?: any;
}

const BookSearch: React.FC<SearchBoxProps> = ({ books, setResultList }: SearchBoxProps) => {
  const [bookName, setBookName] = useState({
    searchData: ""
  });

  const {
    searchData
  } = bookName;

  const handleBookhaneChange = (name: any) => (event: any) => {
    event.preventDefault();
    setBookName({ ...bookName, [name]: event.target.value });
  }

  // let regex = new RegExp(["^", searchData, "$"].join(""), "i");

  const flterByBookName = books?.filter(
    (book) => book.name?.toLowerCase().indexOf(searchData.toLowerCase()) > -1
  );

  useEffect(() => {
    setResultList(flterByBookName);
  }, [searchData]);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <TextField
          className="search-field"
          placeholder="Search and hit enter..."
          fullwidth
          value={searchData}
          onChange={handleBookhaneChange("searchData")}
        />
        <Icon className="search-icon" size="18px">
          search
        </Icon>
      </StyledSearchBox>
    </Box>
  );
};

export default BookSearch;
