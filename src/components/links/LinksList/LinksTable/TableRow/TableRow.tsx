import { Tr, Td, HStack } from "@chakra-ui/react";
import * as React from "react";
import { selectCategoriesAsKeyValuePairs } from "../../../../../redux/commands/commandsSlice";
import { useSelector } from "react-redux";
import { Link } from "../../../../../types/types";
import LinkOptions from "./LinkOptions/LinkOptions";
import { selectLinksCategoriesAsObject } from "../../../../../redux/links/linksSlice";

interface IProps {
  linkItem: Link;
  showCategories: boolean;
}

function TableRow({ linkItem, showCategories }: IProps) {
  const categoriesList = useSelector(selectLinksCategoriesAsObject);
  const { title, link, category } = linkItem;

  return (
    <Tr>
      <Td>{title.charAt(0).toUpperCase() + title.slice(1)}</Td>

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
