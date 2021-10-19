import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectAllCommands } from "../../redux/commands/commandsSlice";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";
import { AiOutlineSearch } from "react-icons/ai";
import { useParams } from "react-router-dom";

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

  if (!commands || commands.length === 0)
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
        >
          <AddCommandButton />
          <InputGroup>
            <Input
              type="text"
              placeholder="Search by 'How Tos'"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                aria-label="search button"
                icon={<AiOutlineSearch color="gray.300" />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      </>
    );

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
      >
        {params.id}
        <AddCommandButton />
        {isSearching && <Spinner ml="3" color="blue.500" />}
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
        <Table>
          <Thead>
            <Tr>
              <TableHeader field="howTo" label="How to..." />
              <TableHeader field="command" label="Command" />
              <TableHeader field="category" label="Category" />
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {commands.map((command, index) => (
              <TableRow commandItem={command} index={index} key={index} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default CommandsList;
