import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import { AiOutlineSearch } from "react-icons/ai";
import CommandsTable from "../shared/CommandsTable/CommandsTable";

function CommandsList(props: { commands: any; showCategories: boolean }) {
  const [commands, setCommands] = React.useState(props.commands);
  const [search, setSearch] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("0", "1px");

  // filter commands on search
  // wait 500ms after user stops typing before filtering
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCommands(() => {
        const newArray = props.commands.filter(
          (item: { description: string }) =>
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
  }, [search]);

  React.useEffect(() => {
    setCommands(props.commands);
  }, [props.commands]);

  // TODO push router to login page when no user

  return (
    <>
      <Box
        minW="container.xl"
        maxW="container.xl"
        w="container.xl"
        h="80vh"
        overflowX="auto"
        overflowY="scroll"
        boxShadow="base"
        rounded="md"
        p="5"
        border={border}
        borderColor="gray.700"
        bgColor={bgColor}
        position="relative"
      >
        <AddCommandButton />
        {isSearching && (
          <Spinner position="absolute" top="3" right="3" color="blue.500" />
        )}

        {/* SEARCH BAR */}
        <InputGroup>
          <Input
            type="text"
            placeholder="Search by 'How Tos'"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputRightElement
            children={
              <IconButton
                size="md"
                aria-label="search-button"
                icon={<AiOutlineSearch color="gray.300" />}
              />
            }
          />
        </InputGroup>

        <CommandsTable
          commands={commands}
          showCategories={props.showCategories}
        />
      </Box>
    </>
  );
}

export default CommandsList;
