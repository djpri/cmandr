import {
  Box,
  IconButton,
  Input,
  Link as ChakraLink,
  Text,
  InputGroup,
  InputRightElement,
  Spinner,
  useColorModeValue,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import AddLinkButton from "./AddLinkButton/AddLinkButton";
import { selectAllLinks } from "../../redux/links/linksSlice";
import { useSelector } from "react-redux";
import { Link } from "../../types/types";

function LinksList() {
  const reduxLinks = useSelector(selectAllLinks);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(reduxLinks);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();

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
        // p="5"
        border={border}
        borderColor="gray.700"
        bgColor={bgColor}
        position="relative"
      >
        <Box zIndex="100" mb="2" pt="5" pl="5" pr="5">
          {isSearching && (
            <Spinner position="absolute" top="3" right="3" color="blue.500" />
          )}
          {/* SEARCH BAR */}
          <InputGroup>
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
          <AddLinkButton />
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            <GridItem>
              <Heading>Link</Heading>
            </GridItem>
            <GridItem>
              <Heading>URL</Heading>
            </GridItem>
            <GridItem>
              <Heading>Category</Heading>
            </GridItem>
            {searchResults &&
              searchResults.map((item) => (
                <>
                  <GridItem>
                    <ChakraLink href={item.link} isExternal>
                      <Text>{item.title}</Text>
                    </ChakraLink>
                  </GridItem>
                  <GridItem>
                    <Text>{item.link}</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{item.category.name}</Text>
                  </GridItem>
                </>
              ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default LinksList;
