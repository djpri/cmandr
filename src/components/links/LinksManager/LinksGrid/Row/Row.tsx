import {
  Grid,
  GridItem,
  Image,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { LinkReadDto } from "models/link";
import { Key } from "react";
import LinkOptions from "./LinkOptions/LinkOptions";

interface IProps {
  linkItem: LinkReadDto;
  showCategories: boolean;
  isLoading: boolean;
  isSelected: boolean;
  toggleCurrentRow: (set?: boolean) => void;
  toggleAllRowsSelected: (set?: boolean) => void;
  selectedRowIds: Record<Key, boolean>;
  toggleOtherRow: (key: Key, set?: boolean) => void;
  rowId: Key;
}

function TableRow({
  linkItem,
  showCategories,
  isSelected,
  toggleCurrentRow,
  toggleAllRowsSelected,
  selectedRowIds,
  toggleOtherRow,
  rowId,
}: IProps) {
  const { title, url, category, faviconImageUrl } = linkItem;
  const selectedRowColor = useColorModeValue("gray.300", "blue.600");

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

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains("clickToSelect")) {
      return;
    }
    const wasSelected = isSelected;

    if (event.ctrlKey) {
      toggleCurrentRow();
    } else {
      toggleAllRowsSelected(false);
      toggleCurrentRow(!wasSelected);
    }

    if (event.shiftKey) {
      const keys = Object.keys(selectedRowIds).map((k) => parseInt(k));
      keys.push(rowId as number);
      const min = Math.min(...keys);
      const max = Math.max(...keys);
      for (let i = min; i <= max; i++) {
        toggleOtherRow(i.toString(), true);
      }
      document.getSelection().removeAllRanges();
    }
  };

  const formattedTitleString = new DOMParser().parseFromString(
    title.charAt(0).toUpperCase() + title.slice(1),
    "text/html"
  ).body.textContent;

  return (
    <Grid
      templateColumns={
        showCategories
          ? ["1fr", null, null, "4fr 6fr 2fr 2fr"]
          : ["1fr", null, null, "4fr 6fr 2fr"]
      }
      gap={[1, 1, 2, 4]}
      py={2}
      px={4}
      rounded="none"
      className="gridRow clickToSelect"
      bgColor={isSelected && selectedRowColor}
      _hover={{
        bgColor: isSelected && selectedRowColor,
      }}
      onMouseDown={handleClick}
    >
      <GridItem className="clickToSelect">
        <ChakraLink href={url} isExternal>
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

      <GridItem className="clickToSelect" overflow="hidden" maxWidth="90%" textOverflow="ellipsis" whiteSpace="nowrap">
        <ChakraLink href={url} isExternal title={url} >
          {url}
        </ChakraLink>
      </GridItem>

      {showCategories && <GridItem>{category?.name}</GridItem>}

      <GridItem className="clickToSelect">
        <LinkOptions link={linkItem} />
      </GridItem>
    </Grid>
  );
}

export default TableRow;
