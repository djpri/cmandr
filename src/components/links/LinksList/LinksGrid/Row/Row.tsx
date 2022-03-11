import {
  Grid,
  GridItem,
  HStack,
  Image,
  Link as ChakraLink,
  Skeleton,
} from "@chakra-ui/react";
import useLinkCategories from "hooks/useLinkCategories";
import { Link } from "models/link";
import * as React from "react";
import LinkOptions from "./LinkOptions/LinkOptions";

interface IProps {
  linkItem: Link;
  showCategories: boolean;
  isLoading: boolean;
}

function TableRow({ linkItem, showCategories, isLoading }: IProps) {
  const { query: allCategoriesQuery } = useLinkCategories();
  const { title, link, category } = linkItem;

  const getFaviconUrl = (link) => {
    if (linkItem.favicon_url !== null) return linkItem.favicon_url;
    try {
      const url = new URL(link);
      const hostName = url.hostname.replace("www.", "");
      return `https://${hostName}/favicon.ico`;
    } catch (error) {
      return null;
    }
  };

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
            {getFaviconUrl(link) !== null && (
              <Image
                display="inline"
                mr="5px"
                height="16px"
                src={getFaviconUrl(link)}
              />
            )}

            {title.charAt(0).toUpperCase() + title.slice(1)}
          </ChakraLink>
        </GridItem>
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <GridItem>
          <ChakraLink href={link} isExternal>
            {`${link.substring(0, 30)}...`}
          </ChakraLink>
        </GridItem>
      </Skeleton>

      {showCategories && (
        <Skeleton isLoaded={!isLoading}>
          <GridItem>{allCategoriesQuery.data[category.id]}</GridItem>
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
