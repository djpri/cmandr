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
import { useSelector } from "react-redux";
import { selectAllCommands } from "../../redux/commands/commandsSlice";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import { AiOutlineSearch } from "react-icons/ai";
import { useParams } from "react-router-dom";
import CommandsTable from "../shared/CommandsTable/CommandsTable";

function CommandsList() {
  const reduxCommands = useSelector(selectAllCommands);

  const [commands, setCommands] = React.useState(reduxCommands);
  const [search, setSearch] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("0", "1px");

  let params: { id: string } = useParams();

  React.useEffect(() => {
    setCommands(reduxCommands);
  }, [reduxCommands]);

  // filter commands on search
  // wait 500ms after user stops typing before filtering
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCommands(() => {
        const newArray = reduxCommands.filter((item) =>
          item.howTo.match(new RegExp(search, "i"))
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

  // TODO push router to login page
  if (!commands || commands.length === 0) return null;

  return (
    <>
      <Box
        maxW="container.xl"
        w="container.xl"
        overflowX="auto"
        boxShadow="base"
        rounded="md"
        p="5"
        border={border}
        borderColor="gray.700"
        bgColor={bgColor}
        position="relative"
      >
        {params.id}
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

        <CommandsTable commands={commands} />
      </Box>
    </>
  );
}

export default CommandsList;
