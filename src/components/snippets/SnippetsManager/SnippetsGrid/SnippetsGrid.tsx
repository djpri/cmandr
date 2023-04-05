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
import { SnippetReadDto } from "models/snippets";
import { useEffect, useMemo, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Row from "./Row/Row";

interface IProps {
  snippets: SnippetReadDto[];
  showCategories: boolean;
  isLoading: boolean;
}

export const gridColumnsWithCategory = ["1fr", null, null, "10fr 2fr 2fr 2fr"];
export const gridColumnsWithoutCategory = ["1fr", null, null, "10fr 2fr 2fr"];


function SnippetsGrid({ snippets, showCategories, isLoading }: IProps) {
  const columns = useMemo<ColumnDef<SnippetReadDto>[]>(() => {
    if (showCategories) {
      return [
        {
          header: () => "Description",
          accessorKey: "description",
        },
        {
          header: () => "Language",
          accessorKey: "language",
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
        header: () => "Language",
        accessorKey: "language",
      },
    ];
  }, [showCategories]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: snippets,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageSize(25);
  }, []);

  const Headers = () => {
    return (
      <Grid p="4">
        <HStack gap="4" justifyContent="flex-end">
          <Text>Sort by:</Text>
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
              <HStack
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                cursor={header.column.getCanSort() ? "pointer" : "none"}
              >
                <Text as="b" userSelect="none">
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
          ))
          )}</HStack>
        <hr/>
      </Grid>
    );
  };

  const Rows = () => {
    const pageSize = table.getState().pagination.pageSize;

    return (
      <Grid>
        <Box>
          {table
            .getRowModel()
            .rows.slice(0, pageSize)
            .map((row) => {
              return (
                <Row
                  showCategories={showCategories}
                  snippet={row.original}
                  row={row}
                  isLoading={isLoading}
                  table={table}
                  key={row.id}
                />
              );
            })}
        </Box>
      </Grid>
    );
  };

  return (
    <Box>
      {table.getSelectedRowModel().flatRows.length > 1 && (
        <RowSelectionMenu
          table={table}
          type="link"
        />
      )}
      {table.getPreFilteredRowModel().flatRows.length > 1 && (
        <SearchAndPagination
          table={table}
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
        />
      )}
      <Headers />
      <Rows />
    </Box>
  );
}

export default SnippetsGrid;
