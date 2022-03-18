import { GridItem, HStack, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { LinksSortFunction, sortFunctions } from "helpers/linksSortFunctions";
import { LinkReadDto } from "models/link";
import React from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

interface IProps {
  sortFunction?: (a: LinkReadDto, b: LinkReadDto) => 1 | -1;
  setSortFunction?: React.Dispatch<React.SetStateAction<LinksSortFunction>>;
  label: string;
  field: "url" | "title" | "category";
}

function TableHeader({ sortFunction, setSortFunction, field, label }: IProps) {
  return (
    <GridItem>
      <HStack>
        <Text>{label}</Text>
        <Tooltip label="sort A -> Z" openDelay={500}>
          <IconButton
            size="xs"
            onClick={() => setSortFunction(() => sortFunctions[field].ascend)}
            icon={<AiFillCaretUp />}
            aria-label="sort how to field ascending"
          />
        </Tooltip>
        <Tooltip label="sort Z -> A" openDelay={500}>
          <IconButton
            size="xs"
            onClick={() => setSortFunction(() => sortFunctions[field].descend)}
            icon={<AiFillCaretDown />}
            aria-label="sort how to field descending"
          />
        </Tooltip>
      </HStack>
    </GridItem>
  );
}

export default TableHeader;
