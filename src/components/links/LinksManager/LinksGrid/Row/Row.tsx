import {
  Grid,
  GridItem,
  HStack,
  Image,
  Link as ChakraLink,
  Skeleton,
} from "@chakra-ui/react";
import useLinkCategories from "hooks/links/useLinkCategories";
import { LinkReadDto } from "models/link";
import LinkOptions from "./LinkOptions/LinkOptions";

interface IProps {
  linkItem: LinkReadDto;
  showCategories: boolean;
  isLoading: boolean;
}

function TableRow({ linkItem, showCategories, isLoading }: IProps) {
  const { query } = useLinkCategories();
  const { title, url, category } = linkItem;

  const getFaviconUrl = (link) => {
    if (linkItem.faviconImageUrl !== null) return linkItem.faviconImageUrl;
    try {
      const url = new URL(link);
      const hostName = url.hostname.replace("www.", "");
      // return `https://${hostName}/favicon.ico`;
      return null;
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
          <ChakraLink href={url} isExternal>
            {getFaviconUrl(url) !== null && (
              <Image
                display="inline"
                mr="5px"
                height="16px"
                src={getFaviconUrl(url)}
              />
            )}

            {title.charAt(0).toUpperCase() + title.slice(1)}
          </ChakraLink>
        </GridItem>
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <GridItem>
          <ChakraLink href={url} isExternal>
            {`${url.substring(0, 30)}...`}
          </ChakraLink>
        </GridItem>
      </Skeleton>

      {showCategories && (
        <Skeleton isLoaded={!isLoading}>
          <GridItem>{linkItem?.category?.name}</GridItem>
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
