import {
  Box,
  Input,
  InputGroup,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ErrorBoundaryWrapper from "components/other/ErrorBoundary";
import { CommandReadDto } from "models/command";
import { useRef } from "react";
import useCommandsFilter from "../../../hooks/commands/useCommandsFilter";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import CommandsTable from "./CommandsGrid/CommandsGrid";

interface IProps {
  categoryId?: number;
  commands: CommandReadDto[];
}

function CommandsManager({ categoryId, commands }: IProps) {
  const ref = useRef(null);
  const bgColor = useColorModeValue("#f2f6fa", "gray.800");
  const border = useColorModeValue("0", "1px");

  const {
    hasData,
    filteredCommands,
    search,
    setSearch,
    sortFunction,
    setSortFunction,
  } = useCommandsFilter(commands);

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
        {filteredCommands?.length > 0 && (
          <CommandsTable
            commands={filteredCommands}
            showCategories={!categoryId}
            sortFunction={sortFunction}
            setSortFunction={setSortFunction}
          />
        )}
        {!hasData && (
          <Text px="20px" pb="30px">
            It looks like there are no commands! Click the <b>ADD</b> button
            above to add some.
          </Text>
        )}
      </Box>
    </ErrorBoundaryWrapper>
  );
}

export default CommandsManager;
