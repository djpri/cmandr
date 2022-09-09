import {
  Grid,
  GridItem,
  HStack,
  Image,
  Link as ChakraLink,
  Skeleton,
} from "@chakra-ui/react";
import { LinkReadDto } from "models/link";
import LinkOptions from "./LinkOptions/LinkOptions";

interface IProps {
  linkItem: LinkReadDto;
  showCategories: boolean;
  isLoading: boolean;
}

function TableRow({ linkItem, showCategories, isLoading }: IProps) {
  const { title, url, category, faviconImageUrl, previewImageUrl } = linkItem;

  const getFaviconUrl = (link) => {
    if (faviconImageUrl !== null) return faviconImageUrl;
    try {
      const url = new URL(link);
      const hostName = url.hostname.replace("www.", "");
      return `https://www.google.com/s2/favicons?sz=32&domain_url=${hostName}`;
    } catch (error) {
      return null;
    }
  };

  const formattedTitleString = new DOMParser().parseFromString(
    title.charAt(0).toUpperCase() + title.slice(1),
    "text/html"
  ).body.textContent;

  return (
    <Grid
      templateColumns={["1fr", null, null, "2fr 2fr 1fr 1fr"]}
      gap={4}
      py={2}
      px={4}
      rounded="md"
      className="gridRow"
    >
      <Skeleton isLoaded={!isLoading}>
        <GridItem>
          <ChakraLink
            href={url}
            isExternal
            display="inline-flex"
            alignItems="flex-start"
          >
            {getFaviconUrl(url) !== null && (
              <Image
                display="inline-block"
                height="16px"
                width="16px"
                mt="4px"
                mr="5px"
                src={getFaviconUrl(url)}
              />
            )}

            {formattedTitleString}
          </ChakraLink>
        </GridItem>
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <GridItem>
          <ChakraLink href={url} isExternal title={url}>
            {`${url.substring(0, 30)}${url.length >= 30 ? "..." : ""}`}
          </ChakraLink>
        </GridItem>
      </Skeleton>

      {showCategories && (
        <Skeleton isLoaded={!isLoading}>
          <GridItem>{category?.name}</GridItem>
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
