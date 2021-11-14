import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import { AiOutlineSearch } from "react-icons/ai";
import CommandsTable from "../CommandsTable/CommandsTable";
import { selectCommands } from "../../redux/commands/commandsSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";

function CommandsList(props: { showCategories: boolean }) {
  const reduxCommands = useSelector(selectCommands);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(reduxCommands);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("0", "1px");

  // filter commands on search
  // wait 500ms after user stops typing before filtering
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchResults(() => {
        const newArray = reduxCommands.filter((item: { description: string }) =>
          item.description.match(new RegExp(search, "i"))
        );
        return newArray;
      });
      setIsSearching(false);
    }, 500);
    return () => {
      setIsSearching(true);
      clearTimeout(timeout);
    };
  }, [search, reduxCommands]);

  useEffect(() => {
    setSearchResults([]);
  }, [location]);

  useEffect(() => {
    setSearchResults(reduxCommands);
  }, [reduxCommands]);

  // TODO push router to login page when no user

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
              placeholder="Search by description"
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
          <AddCommandButton />
        </Box>
      </Box>
      <CommandsTable
        commands={searchResults ? searchResults : reduxCommands}
        showCategories={props.showCategories}
      />
    </>
  );
}

export default CommandsList;
