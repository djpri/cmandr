import { Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import * as React from "react";
import { Command } from "../../../types/types";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";

function CommandsTable({ commands, showCategories }) {
  return (
    <Table>
      <Thead>
        <Tr>
          <TableHeader field="howTo" label="How to..." />
          <TableHeader field="command" label="Command" />
          {showCategories && <TableHeader field="category" label="Category" />}
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {commands.map((command: Command, index: number) => (
          <TableRow
            commandItem={command}
            index={index}
            key={index}
            showCategories={showCategories}
          />
        ))}
      </Tbody>
    </Table>
  );
}

export default CommandsTable;
