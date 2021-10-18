import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectAllCommands } from "../../redux/commands/commandsSlice";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";
import { AiOutlineSearch } from "react-icons/ai";

function CommandManager() {
  const reduxCommands = useSelector(selectAllCommands);
  const [commands, setCommands] = React.useState(reduxCommands);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setCommands(reduxCommands);
  }, [reduxCommands]);

  React.useEffect(() => {
    setCommands(() => {
      const newArray = reduxCommands.filter((item) =>
        item.howTo.includes(search)
      );
      return newArray;
    });
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
        >
          <AddCommandButton />
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Search by 'How Tos'"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
      >
        <AddCommandButton />
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineSearch color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Search by 'How Tos'"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              <TableRow commandItem={command} key={index} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default CommandManager;
