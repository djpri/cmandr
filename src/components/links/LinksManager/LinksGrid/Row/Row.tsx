import {
  Grid,
  GridItem,
  Image,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { Row, Table } from "@tanstack/react-table";
import { isInDevelopment } from "helpers/environment";
import { LinkReadDto } from "models/link";
import { Key } from "react";
import LinkOptions from "./LinkOptions/LinkOptions";

interface IProps {
  linkItem: LinkReadDto;
  showCategories: boolean;
  isLoading: boolean;
  row: Row<LinkReadDto>;
  table: Table<LinkReadDto>;
}

function TableRow({
  linkItem,
  row,
  table,
  showCategories,
}: IProps) {
  const { id, title, url, category, faviconImageUrl } = linkItem;
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
    const wasSelected = row.getIsSelected();

    if (event.ctrlKey) {
      row.toggleSelected();
    } else {
      table.toggleAllRowsSelected(false);
      row.toggleSelected(!wasSelected)
    }

    if (event.shiftKey) {
      const keys = table
        .getSelectedRowModel()
        .flatRows.map((k) => parseInt(k.id));
      keys.push(parseInt(row.id));
      const min = Math.min(...keys);
      const max = Math.max(...keys);
      const allRowsToSelect = table
        .getRowModel()
        .flatRows.slice(min, max + 1)
        .map((k) => parseInt(k.id));
      const rowSelection = allRowsToSelect.reduce((m, v) => {
        m[v] = true;
        return m;
      }, {});
      table.setRowSelection(rowSelection);
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
      bgColor={row.getIsSelected() && selectedRowColor}
      _hover={{
        bgColor: row.getIsSelected() && selectedRowColor,
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

          {isInDevelopment && `(${linkItem.id})`} {formattedTitleString}
        </ChakraLink>
      </GridItem>

      <GridItem
        className="clickToSelect"
        overflow="hidden"
        maxWidth="90%"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        <ChakraLink href={url} isExternal title={url}>
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
