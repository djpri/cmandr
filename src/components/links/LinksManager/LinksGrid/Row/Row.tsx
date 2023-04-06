import {
  Link as ChakraLink,
  Grid,
  GridItem,
  Image,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { Row, Table } from "@tanstack/react-table";
import { isInDevelopment } from "helpers/environment";
import useTableSelectors from "hooks/table/useTableSelectors";
import { LinkReadDto } from "models/link";
import { useMemo } from "react";
import { selectShowImagePreviews } from "redux/slices/linksSlice";
import { useAppSelector } from "redux/store";
import LinkOptions from "./LinkOptions/LinkOptions";

interface IProps {
  linkItem: LinkReadDto;
  showCategories: boolean;
  isLoading: boolean;
  row: Row<LinkReadDto>;
  table: Table<LinkReadDto>;
}

function TableRow({ linkItem, row, table, showCategories }: IProps) {
  const { title, url, category } = linkItem;
  const showImagePreviews = useAppSelector(selectShowImagePreviews);
  const selectedRowColor = useColorModeValue("gray.300", "blue.600");
  const { multiSelectRow } = useTableSelectors<LinkReadDto>({
    table,
    row,
    requireClickToSelect: true,
  });

  const faviconUrl = useMemo(() => {
    if (linkItem?.faviconImageUrl) {
      return linkItem.faviconImageUrl;
    }
    try {
      const linkUrl = new URL(url);
      const hostName = linkUrl.hostname.replace("www.", "");
      return `https://www.google.com/s2/favicons?sz=32&domain_url=${hostName}`;
    } catch (error) {
      return null;
    }
  }, [linkItem]);

  const formattedTitleString = new DOMParser().parseFromString(
    title?.charAt(0).toUpperCase() + title?.slice(1),
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
      onMouseDown={multiSelectRow}
    >
      <GridItem className="clickToSelect">
        <ChakraLink href={url} isExternal>
          {faviconUrl !== null && (
            <Image
              display="inline-block"
              height="16px"
              width="16px"
              mt="4px"
              mr="5px"
              src={faviconUrl}
            />
          )}
          {isInDevelopment && `(${linkItem.id})`} {formattedTitleString}
        </ChakraLink>
        {linkItem.previewImageUrl && showImagePreviews && (
          <chakra.img
            maxH="70px"
            src={linkItem?.previewImageUrl}
            alt="preview-url"
          />
        )}
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

      <GridItem
        className="clickToSelect"
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-end"
      >
        <LinkOptions link={linkItem} />
      </GridItem>
    </Grid>
  );
}

export default TableRow;
