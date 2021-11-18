import { Th, HStack, Tooltip, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { sortLinksByField } from "../../../../../redux/links/linksSlice";

function TableHeader({ field, label }) {
  const dispatch = useDispatch();
  return (
    <Th>
      <HStack>
        <Text>{label}</Text>
        <Tooltip label="sort A -> Z" openDelay={500}>
          <IconButton
            size="xs"
            onClick={() => dispatch(sortLinksByField(field))}
            icon={<AiFillCaretUp />}
            aria-label="sort how to field ascending"
          />
        </Tooltip>
        <Tooltip label="sort Z -> A" openDelay={500}>
          <IconButton
            size="xs"
            onClick={() => dispatch(sortLinksByField(field, false))}
            icon={<AiFillCaretDown />}
            aria-label="sort how to field descending"
          />
        </Tooltip>
      </HStack>
    </Th>
  );
}

export default TableHeader;