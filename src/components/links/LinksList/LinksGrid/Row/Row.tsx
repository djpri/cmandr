import {
  HStack,
  Link as ChakraLink,
  GridItem,
  Grid,
  Skeleton,
} from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "../../../../../models/models";
import LinkOptions from "./LinkOptions/LinkOptions";
import { selectLinksCategoriesAsObject } from "../../../../../redux/links/linksSlice";

interface IProps {
  linkItem: Link;
  showCategories: boolean;
  isLoading: boolean;
}

function TableRow({ linkItem, showCategories, isLoading }: IProps) {
  const categoriesList = useSelector(selectLinksCategoriesAsObject);
  const { title, link, category } = linkItem;

  return (
    <Grid
      templateColumns={["1fr", null, null, "2fr 2fr 1fr 1fr"]}
      p="4"
      gap={4}
      rounded="md"
      className="gridRow"
    >
      <Skeleton isLoaded={!isLoading}>
        <GridItem>
          <ChakraLink href={link} isExternal>
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </ChakraLink>
        </GridItem>
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <GridItem>
          <ChakraLink href={link} isExternal>
            {link}
          </ChakraLink>
        </GridItem>
      </Skeleton>

      {showCategories && (
        <Skeleton isLoaded={!isLoading}>
          <GridItem>{categoriesList[category.id]}</GridItem>
        </Skeleton>
      )}

      <Skeleton isLoaded={!isLoading}>
        <GridItem>
          <HStack spacing="4">
            <LinkOptions link={linkItem} />
          </HStack>
        </GridItem>
      </Skeleton>
    </Grid>
  );
}

export default TableRow;
