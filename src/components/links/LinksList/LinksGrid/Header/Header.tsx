import { GridItem, HStack, IconButton, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

function TableHeader({ field, label }) {
  return (
    <GridItem>
      <HStack>
        <Text>{label}</Text>
        <Tooltip label="sort A -> Z" openDelay={500}>
          <IconButton
            size="xs"
            onClick={() => console.log(field)}
            icon={<AiFillCaretUp />}
            aria-label="sort how to field ascending"
          />
        </Tooltip>
        <Tooltip label="sort Z -> A" openDelay={500}>
          <IconButton
            size="xs"
            onClick={() => console.log(field)}
            icon={<AiFillCaretDown />}
            aria-label="sort how to field descending"
          />
        </Tooltip>
      </HStack>
    </GridItem>
  );
}

export default TableHeader;
