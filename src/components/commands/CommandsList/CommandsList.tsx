import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import CommandsTable from "./CommandsGrid/CommandsGrid";
import { selectCommands } from "../../../redux/commands/commandsSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { GiCrosshair } from "react-icons/gi";

function CommandsList(props: { showCategories: boolean }) {
  const reduxCommands = useSelector(selectCommands);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(reduxCommands);
  const location = useLocation();
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("0", "1px");

  // filter commands on search
  useEffect(() => {
    setSearchResults(() => {
      const newArray = reduxCommands.filter((item: { description: string }) =>
        item.description.match(new RegExp(search, "i"))
      );
      return newArray;
    });
    setIsLoading(false);
  }, [search, reduxCommands]);

  useEffect(() => {
    setSearch("");
  }, [location]);

  useEffect(() => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const setNewCommands = async () => {
      setSearchResults([]);
      await delay(500);
      setSearchResults(reduxCommands);
    };
    setNewCommands();
  }, [reduxCommands]);

  return (
    <>
      <Box
        maxW="container.xl"
        w={["100%", null, null, null, "container.xl"]}
        boxShadow="base"
        rounded="md"
        border={border}
        borderColor="gray.700"
        bgColor={bgColor}
        position="relative"
      >
        <Box zIndex="100" pt="4" pb="2" pl="5" pr="5">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="3"
          >
            <AddCommandButton ref={ref} />
            {/* SEARCH BAR */}
            <InputGroup maxW="md" w={["xs", "xs", "sm", "md"]}>
              <Input
                type="text"
                placeholder="Search by description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <InputRightElement
                  children={<GiCrosshair color="gray.300" />}
                />
              )}
            </InputGroup>
          </Box>
          <Box ref={ref} />
        </Box>
        {!isLoading && (
          <CommandsTable
            commands={searchResults}
            showCategories={props.showCategories}
          />
        )}
      </Box>
    </>
  );
}

export default CommandsList;