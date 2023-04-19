import { Box, Grid, HStack, Text } from "@chakra-ui/react";
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
import { useEffect, useMemo, useRef, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { setCode, setLanguage } from "redux/slices/editorSlice";
import { useAppDispatch } from "redux/store";
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
  const readOnlyCode = useRef({ code: "", language: "" });

  const updateCodeRef = (code: string, language: string) => {
    readOnlyCode.current = { code, language };
  };

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: snippets,
    columns,
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
          )}
        </HStack>
        <hr />
      </Grid>
    );
  };

  const firstSelectedRow = useMemo<SnippetReadDto>(() => {
    if (table.getSelectedRowModel()?.flatRows.length > 0) {
      return table.getSelectedRowModel().flatRows[0].original;
    } else {
      return null;
    }
  }, [table.getSelectedRowModel().flatRows]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (firstSelectedRow) {
      dispatch(setCode(firstSelectedRow.code));
      dispatch(setLanguage(firstSelectedRow.language));
    }
  }, [firstSelectedRow]);

  const handleKeyPressRowSelection = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { 
      e.preventDefault();
      if (table.getSelectedRowModel().flatRows.length === 0) {
        const firstRow = table.getRowModel().rows[0];
        table.setRowSelection({ [firstRow.id]: true });
      }
    }
    if (e.key === "ArrowDown") {
      const selectedRow = table.getSelectedRowModel().flatRows[0];
      const rowCount = table.getRowModel().rows.length;
      const nextRowExists = selectedRow.index + 1 < rowCount;
      if (nextRowExists) {
        const nextRow = table.getRowModel().rows[selectedRow.index + 1];
        table.setRowSelection({ [nextRow.id]: true });
      }
    }
    if (e.key === "ArrowUp") {
      const selectedRow = table.getSelectedRowModel().flatRows[0];
      const previousRowExists = selectedRow.index >= 1;
      if (previousRowExists) {
        const previousRow = table.getRowModel().rows[selectedRow.index - 1];
        table.setRowSelection({ [previousRow.id]: true });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPressRowSelection);
    return () => {
      document.removeEventListener("keydown", handleKeyPressRowSelection);
    };
  }, []);

  const Rows = () => {
    const pageSize = table.getState().pagination.pageSize;

    return (
      <Grid templateColumns={"1fr"} gap={4} maxW="100%">
        <Box gridColumn={[2, null, null, 1]}>
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
                  setReadOnlyCode={updateCodeRef}
                />
              );
            })}
        </Box>
      </Grid>
    );
  };

  return (
    <Box w="100%">
      {table.getSelectedRowModel().flatRows.length > 1 && (
        <RowSelectionMenu table={table} type="snippet" />
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
