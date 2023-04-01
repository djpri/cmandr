import { Box, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import RowSelectionMenu from "components/other/RowSelectionMenu";
import SearchAndPagination from "components/other/SearchAndPagination";
import useCommands from "hooks/commands/useCommands";
import { CommandReadDto } from "models/command";
import { useEffect, useMemo, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import CommandRow from "./Row/Row";

interface IProps {
  commands: CommandReadDto[];
  showCategories: boolean;
}

function CommandsTable({ commands, showCategories }: IProps) {
  const columns = useMemo<ColumnDef<CommandReadDto>[]>(() => {
    if (showCategories) {
      return [
        {
          header: () => "Description",
          accessorKey: "description",
        },
        {
          header: () => "Command",
          accessorKey: "line",
        },
        {
          header: () => "Category",
          accessorKey: "category",
        },
      ];
    }
    return [
      {
        header: () => "Description",
        accessorKey: "description",
      },
      {
        header: () => "Command",
        accessorKey: "line",
      },
    ];
  }, [showCategories]);
  const [globalFilter, setGlobalFilter] = useState("");
  const data = useMemo(() => {
    return commands;
  }, [commands]);

  const { deleteMultipleCommandsMutation } = useCommands();
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageSize(25);
  }, []);

  const handleBulkDelete = () => {
    const commandIds = table
      .getSelectedRowModel()
      .flatRows.map((rowData) => rowData.original.id);
    deleteMultipleCommandsMutation.mutate(commandIds);
  };

  return (
    <Box p="0" display="flex" flexDirection="column">
      {table.getSelectedRowModel().flatRows.length > 1 && (
        <RowSelectionMenu
          handleBulkDelete={handleBulkDelete}
          table={table}
          type="command"
        />
      )}
      {table.getSelectedRowModel().flatRows.length <= 1 && (
        <SearchAndPagination
          table={table}
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
        />
      )}
      <Grid
        templateColumns={["1fr", null, null, "1.7fr 2fr 1fr 1fr"]}
        p="4"
        gap={2}
        rounded="md"
      >
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <GridItem key={header.id}>
              <HStack
                onClick={header.column.getToggleSortingHandler()}
                cursor={header.column.getCanSort() ? "pointer" : "none"}
              >
                <Text as="b" userSelect={"none"}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Text>
                {{
                  asc: <AiFillCaretUp aria-label="sorted descending" />,
                  desc: <AiFillCaretDown aria-label="sorted ascending" />,
                }[header.column.getIsSorted() as string] ?? null}
              </HStack>
            </GridItem>
          ))
        )}
      </Grid>
      <Box>
        {table
          .getRowModel()
          .rows.slice(0, table.getState().pagination.pageSize)
          .map((row) => {
            return (
              <CommandRow
                row={row}
                showCategories={showCategories}
                commandItem={row.original}
                key={row.id}
                table={table}
              />
            );
          })}
      </Box>
    </Box>
  );
}

export default CommandsTable;
