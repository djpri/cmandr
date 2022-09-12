import {
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { LinksSortFunction } from "helpers/linksSortFunctions";
import { LinkReadDto } from "models/link";
import { Key, useMemo, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import {
  CgChevronDoubleLeft,
  CgChevronDoubleRight,
  CgChevronLeft,
  CgChevronRight,
} from "react-icons/cg";
import { TiArrowUnsorted } from "react-icons/ti";
import {
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Row from "./Row/Row";

interface IProps {
  links: LinkReadDto[];
  showCategories: boolean;
  isLoading: boolean;
  sortFunction?: (a: LinkReadDto, b: LinkReadDto) => 1 | -1;
  setSortFunction?: React.Dispatch<React.SetStateAction<LinksSortFunction>>;
}

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 400);

  return (
    <Input
      mb={2}
      value={value || ""}
      maxW="sm"
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`Search all ${count} items...`}
    />
  );
}

function LinksTable({ links, showCategories }: IProps) {
  const columns = useMemo(() => {
    if (showCategories) {
      return [
        {
          Header: "Title",
          accessor: "title",
        },
        {
          Header: "Url",
          accessor: "url",
        },
        {
          Header: "Category",
          accessor: "category",
        },
      ];
    }
    return [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Url",
        accessor: "url",
      },
    ];
  }, [showCategories]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data: links, initialState: { pageIndex: 0, pageSize: 50 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const SearchAndPagination = () => {
    return (
      <Flex
        pl="4"
        py="3"
        alignItems="center"
        justifyContent="space-between"
        wrap="wrap"
      >
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Box pr="2rem">
          <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <CgChevronDoubleLeft />
          </Button>{" "}
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <CgChevronLeft />
          </Button>{" "}
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            <CgChevronRight />
          </Button>{" "}
          <Button
            mr="1rem"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <CgChevronDoubleRight />
          </Button>{" "}
          <chakra.span justifySelf="flex-end">
            Page{" "}
            <b>
              {pageIndex + 1} of {pageOptions.length}
            </b>{" "}
          </chakra.span>
        </Box>
      </Flex>
    );
  };

  return (
    <Box p="2" {...getTableProps()}>
      <SearchAndPagination />
      <Grid templateColumns={["2fr 2fr 1fr 1fr"]} p="4">
        {
          // Loop over the headers in each row
          headerGroups[0].headers.map((column, index) => (
            // Apply the header cell props
            <GridItem key={index}>
              <HStack {...column.getHeaderProps(column.getSortByToggleProps())}>
                <Text as="b" userSelect="none">
                  {column.render("Header")}
                </Text>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <AiFillCaretDown aria-label="sorted ascending" />
                  ) : (
                    <AiFillCaretUp aria-label="sorted descending" />
                  )
                ) : (
                  <TiArrowUnsorted />
                )}
              </HStack>
            </GridItem>
          ))
        }
      </Grid>

      <Grid templateColumns={["1fr"]} gap={[1, null, null, 0]}>
        <Box {...getTableBodyProps()}>
          {page.map((row, index: Key) => {
            prepareRow(row);
            return (
              <Row
                showCategories={showCategories}
                linkItem={row.original}
                key={row.original.id}
                {...row.getRowProps()}
              />
            );
          })}
        </Box>
      </Grid>
    </Box>
  );
}

export default LinksTable;
