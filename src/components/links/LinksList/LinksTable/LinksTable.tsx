import { Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import * as React from "react";
import { Link } from "../../../../types/types";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";

interface IProps {
  links: Link[];
  showCategories: boolean;
}

function LinksTable({ links, showCategories }: IProps) {
  return (
    <Table variant="unstyled" size="md">
      <Thead>
        <Tr>
          <TableHeader field="title" label="Title" />
          <TableHeader field="Link" label="Link" />
          {showCategories && <TableHeader field="category" label="Category" />}
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {links.map((link: Link, index: number) => (
          <TableRow
            linkItem={link}
            key={link.id}
            showCategories={showCategories}
          />
        ))}
      </Tbody>
    </Table>
  );
}

export default LinksTable;
