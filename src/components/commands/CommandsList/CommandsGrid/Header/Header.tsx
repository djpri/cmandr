import { GridItem, HStack, IconButton, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useDispatch } from "react-redux";

function Header({ field, label }) {
  const dispatch = useDispatch();
  return (
    <GridItem>
      <HStack>
        <Text>{label}</Text>
        <Tooltip label="sort A -> Z" openDelay={500}>
          <IconButton
            size="xs"
            onClick={() => dispatch(field)}
            icon={<AiFillCaretUp />}
            aria-label="sort how to field ascending"
          />
        </Tooltip>
        <Tooltip label="sort Z -> A" openDelay={500}>
          <IconButton
            size="xs"
            onClick={() => dispatch(field)}
            icon={<AiFillCaretDown />}
            aria-label="sort how to field descending"
          />
        </Tooltip>
      </HStack>
    </GridItem>
  );
}

export default Header;
