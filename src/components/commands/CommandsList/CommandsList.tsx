import { Box, Input, InputGroup, useColorModeValue } from "@chakra-ui/react";
import ErrorBoundaryWrapper from "components/other/ErrorBoundary";
import { CommandReadDto } from "models/command";
import React, { useRef } from "react";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import CommandsTable from "./CommandsGrid/CommandsGrid";
import useCommandsFilter from "./useCommandsFilter";

interface IProps {
  categoryId?: number;
  commands: CommandReadDto[];
}

function CommandsList({ categoryId, commands }: IProps) {
  const ref = useRef(null);
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("0", "1px");

  const { filteredCommands, search, setSearch, sortFunction, setSortFunction } =
    useCommandsFilter(commands);

  return (
    <ErrorBoundaryWrapper>
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
            <AddCommandButton ref={ref} categoryId={categoryId} />
            {/* SEARCH BAR */}
            <InputGroup maxW="md" w={["xs", "xs", "sm", "md"]}>
              <Input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Box>
          <Box ref={ref} />
        </Box>
        <CommandsTable
          commands={filteredCommands}
          showCategories={!categoryId}
          sortFunction={sortFunction}
          setSortFunction={setSortFunction}
        />
      </Box>
    </ErrorBoundaryWrapper>
  );
}

export default CommandsList;
