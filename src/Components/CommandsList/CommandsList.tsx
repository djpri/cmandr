import { Box, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectAllCommands } from "../../redux/commands/commandsSlice";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";

function CommandManager() {
  const commands = useSelector(selectAllCommands);

  if (!commands || commands.length === 0)
    return (
      <Box maxW="container.lg" boxShadow="base" rounded="md" p="5">
        no commands available
      </Box>
    );

  return (
    <>
      <Box
        maxW="container.xl"
        overflowX="auto"
        boxShadow="base"
        rounded="md"
        p="5"
      >
        <AddCommandButton />
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
