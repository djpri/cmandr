import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import AddLinkButton from "./AddLinkButton/AddLinkButton";
import { selectAllLinks } from "../../../redux/links/linksSlice";
import { useSelector } from "react-redux";
import { Link } from "../../../types/types";
import LinksTable from "./LinksTable/LinksTable";

function LinksList({ showCategories }) {
  const reduxLinks = useSelector(selectAllLinks);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(reduxLinks);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  const ref = useRef(null);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("0", "1px");

  // filter commands on search
  // wait 500ms after user stops typing before filtering
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchResults(() => {
        const newArray = reduxLinks.filter((item: Link) =>
          item.title.match(new RegExp(search, "i"))
        );
        return newArray;
      });
      setIsSearching(false);
    }, 500);
    return () => {
      setIsSearching(true);
      clearTimeout(timeout);
    };
  }, [search, reduxLinks]);

  useEffect(() => {
    setSearchResults([]);
  }, [location]);

  useEffect(() => {
    setSearchResults(reduxLinks);
  }, [reduxLinks]);

  return (
    <>
      <Box
        minW="container.xl"
        maxW="container.xl"
        w="container.xl"
        boxShadow="base"
        rounded="md"
        border={border}
        borderColor="gray.700"
        bgColor={bgColor}
        position="relative"
      >
        <Box zIndex="100" mb="2" pt="5" pl="5" pr="5">
          {isSearching && (
            <Spinner position="absolute" top="3" right="3" color="blue.500" />
          )}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="3"
          >
            <AddLinkButton ref={ref} />
            {/* SEARCH BAR */}
            <InputGroup maxW="md" w={["xs", "xs", "sm", "md"]}>
              <Input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                mb="5"
              />
              <InputRightElement
                children={
                  <IconButton
                    size="sm"
                    aria-label="search-button"
                    icon={<AiOutlineSearch color="gray.300" />}
                  />
                }
              />
            </InputGroup>
          </Box>
          <Box ref={ref} />
        </Box>
        <LinksTable links={searchResults} showCategories={showCategories} />
      </Box>
    </>
  );
}

export default LinksList;
