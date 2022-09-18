import { Box, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import RowSelectionMenu from "components/other/RowSelectionMenu";
import SearchAndPagination from "components/other/SearchAndPagination";
import useCommands from "hooks/commands/useCommands";
import { CommandReadDto } from "models/command";
import { Key, useMemo } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { TiArrowUnsorted } from "react-icons/ti";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useRowState,
} from "react-table";
import Row from "./Row/Row";

interface IProps {
  commands: CommandReadDto[];
  showCategories: boolean;
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

  const { deleteMultipleCommandsMutation } = useCommands();
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
    { columns, data, initialState: { pageIndex: 0, pageSize: 50 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const handleBulkDelete = () => {
    const commandIds = selectedFlatRows.map((rowData) => rowData.original.id);
    deleteMultipleCommandsMutation.mutate(commandIds);
  };

  return (
    <Box p="0" display="flex" flexDirection="column" {...getTableProps()}>
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
        {page.map((row) => {
          prepareRow(row);
          return (
            <Row
              showCategories={showCategories}
              commandItem={row.original}
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
    </Box>
  );
}

export default CommandsTable;
