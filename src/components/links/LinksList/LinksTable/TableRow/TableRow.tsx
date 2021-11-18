import { Tr, Td, HStack, Link as ChakraLink } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "../../../../../types/types";
import LinkOptions from "./LinkOptions/LinkOptions";
import { selectLinksCategoriesAsObject } from "../../../../../redux/links/linksSlice";
import { useRef, useState } from "react";

interface IProps {
  linkItem: Link;
  showCategories: boolean;
}

function TableRow({ linkItem, showCategories }: IProps) {
  const categoriesList = useSelector(selectLinksCategoriesAsObject);
  const { title, link, category } = linkItem;
  const rowRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Tr
      ref={rowRef}
      bgColor={isFocused && "pink.500"}
      onClick={() => setIsFocused((state) => !state)}
    >
      <ChakraLink href={link} isExternal>
        <Td>{title.charAt(0).toUpperCase() + title.slice(1)}</Td>
      </ChakraLink>
      <Td>{link}</Td>

      {showCategories && <Td>{categoriesList[category.id]}</Td>}

      <Td>
        <HStack spacing="4">
          <LinkOptions link={linkItem} />
        </HStack>
      </Td>
    </Tr>
  );
}

export default TableRow;
