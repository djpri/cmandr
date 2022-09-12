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
import { CommandReadDto } from "models/command";
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
  commands: CommandReadDto[];
  showCategories: boolean;
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

function CommandsTable({ commands, showCategories }: IProps) {
  const columns = useMemo(() => {
    if (showCategories) {
      return [
        {
          Header: "Description",
          accessor: "description",
        },
        {
          Header: "Command",
          accessor: "line",
        },
        {
          Header: "Category",
          accessor: "category",
        },
      ];
    }
    return [
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Command",
        accessor: "line",
      },
    ];
  }, [showCategories]);

  const data = useMemo(() => {
    return commands;
  }, [commands]);

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
    { columns, data, initialState: { pageIndex: 0, pageSize: 50 } },
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
    <Box p="0" display="flex" flexDirection="column" {...getTableProps()}>
      <SearchAndPagination />

      <Grid
        templateColumns={["1fr", null, null, "1.7fr 2fr 1fr 1fr"]}
        p="4"
        gap={2}
        rounded="md"
      >
        {
          // Loop over the headers in each row
          headerGroups[0].headers.map((column, index) => (
            // Apply the header cell props
            <GridItem key={index}>
              <HStack {...column.getHeaderProps(column.getSortByToggleProps())}>
                <Text as="b" userSelect={"none"}>
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

      <Box {...getTableBodyProps()}>
        {page.map((row, index: Key) => {
          prepareRow(row);
          return (
            <Row
              showCategories={showCategories}
              commandItem={row.original}
              key={index}
              {...row.getRowProps()}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default CommandsTable;
