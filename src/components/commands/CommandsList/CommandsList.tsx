import { Box, Input, InputGroup, useColorModeValue } from "@chakra-ui/react";
import UseCommandsData from "hooks/useCommands";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import CommandsTable from "./CommandsGrid/CommandsGrid";

function CommandsList({ showCategories }) {
  const location = useLocation();
  const commandsData = UseCommandsData("commands");
  const [commands, setCommands] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const ref = useRef(null);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("0", "1px");

  // reset results for each new page
  useEffect(() => {
    setSearchResults(null);
    setSearch("");
  }, [location]);

  useEffect(() => {
    setCommands(commandsData.allCommands.data);
  }, [commandsData]);

  // filter commands on search
  useEffect(() => {
    const timeout = setTimeout(() => {
      let newArray = [];
      if (commands.length >= 1) {
        newArray = commands.filter((item: { description: string }) =>
          item.description.match(new RegExp(search, "i"))
        );
      }
      setSearchResults(newArray);
    }, 250);
    return () => {
      clearTimeout(timeout);
    };
  }, [search, commands]);

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
            </InputGroup>
          </Box>
          <Box ref={ref} />
        </Box>
        <CommandsTable
          commands={searchResults}
          showCategories={showCategories}
        />
      </Box>
    </>
  );
}

export default CommandsList;
