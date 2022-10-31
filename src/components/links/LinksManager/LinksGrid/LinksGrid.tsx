import { Box, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import RowSelectionMenu from "components/other/RowSelectionMenu";
import SearchAndPagination from "components/other/SearchAndPagination";
import { LinksSortFunction } from "helpers/linksSortFunctions";
import useLinks from "hooks/links/useLinks";
import { LinkReadDto } from "models/link";
import { Dispatch, Key, SetStateAction, useMemo} from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { TiArrowUnsorted } from "react-icons/ti";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import Row from "./Row/Row";

interface IProps {
  links: LinkReadDto[];
  showCategories: boolean;
  isLoading: boolean;
  sortFunction?: (a: LinkReadDto, b: LinkReadDto) => 1 | -1;
  setSortFunction?: Dispatch<SetStateAction<LinksSortFunction>>;
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
    selectedFlatRows,
    toggleRowSelected: toggleOtherRow,
    toggleAllRowsSelected,
    state: { pageIndex, selectedRowIds },
  } = useTable(
    { columns, data: links, initialState: { pageIndex: 0, pageSize: 50 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const { deleteMultipleLinksMutation } = useLinks();

  const handleBulkDelete = () => {
    const linkIds = selectedFlatRows.map((rowData) => rowData.original.id);
    deleteMultipleLinksMutation.mutate(linkIds);
  };

  const Headers = () => {
    return (
      <Grid
        templateColumns={
          showCategories ? ["1fr", null, null, "4fr 6fr 2fr 2fr"] : ["2fr 4fr"]
        }
        p="4"
      >
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
    );
  };

  const Rows = () => {
    return (
      <Grid templateColumns={["1fr"]} gap={[1, null, null, 0]}>
        <Box {...getTableBodyProps()}>
          {page.map((row, index: Key) => {
            prepareRow(row);
            return (
              <Row
                showCategories={showCategories}
                linkItem={row.original}
                key={row.id}
                {...row.getRowProps()}
                rowId={row.id}
                isSelected={row.isSelected}
                toggleOtherRow={toggleOtherRow}
                toggleCurrentRow={row.toggleRowSelected}
                toggleAllRowsSelected={toggleAllRowsSelected}
                selectedRowIds={selectedRowIds}
              />
            );
          })}
        </Box>
      </Grid>
    );
  };

  return (
    <Box {...getTableProps()}>
      {selectedFlatRows.length > 1 && (
        <RowSelectionMenu
          handleBulkDelete={handleBulkDelete}
          selectedFlatRows={selectedFlatRows}
          toggleAllRowsSelected={toggleAllRowsSelected}
        />
      )}
      {selectedFlatRows.length <= 1 && (
        <SearchAndPagination
          preGlobalFilteredRows={preGlobalFilteredRows}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          state={state}
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          setGlobalFilter={setGlobalFilter}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
        />
      )}
      <Headers />
      <Rows />
    </Box>
  );
}

export default LinksTable;
