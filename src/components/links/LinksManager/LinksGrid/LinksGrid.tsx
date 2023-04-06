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
import useLinks from "hooks/links/useLinks";
import { LinkReadDto } from "models/link";
import { useMemo, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Row from "./Row/Row";

interface IProps {
  links: LinkReadDto[];
  showCategories: boolean;
  isLoading: boolean;
}

function LinksGrid({ links, showCategories, isLoading }: IProps) {  
  const columns = useMemo<ColumnDef<LinkReadDto>[]>(() => {
    if (showCategories) {
      return [
        {
          header: () => "Title",
          accessorKey: "title",
        },
        {
          header: () => "Url",
          accessorKey: "url",
        },
        {
          header: () => "Category",
          accessorKey: "category",
        },
      ];
    }
    return [
      {
        header: () => "Title",
        accessorKey: "title",
      },
      {
        header: () => "Url",
        accessorKey: "url",
      },
    ];
  }, [showCategories]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: links,
    columns,
    state: {
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 25,
      }
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { deleteMultipleLinksMutation } = useLinks();

  const handleBulkDelete = () => {
    const linkIds = table
      .getSelectedRowModel()
      .flatRows.map((rowData) => rowData.original.id);
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
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <GridItem key={header.id}>
              <HStack
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
            </GridItem>
          ))
        )}
      </Grid>
    );
  };

  const Rows = () => {
    const pageSize = table.getState().pagination.pageSize;

    return (
      <Grid templateColumns={["1fr"]} gap={[1, null, null, 0]}>
        <Box>
          {table
            .getRowModel()
            .rows.slice(0, pageSize)
            .map((row) => {
              return (
                <Row
                  showCategories={showCategories}
                  linkItem={row.original}
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
          handleBulkDelete={handleBulkDelete}
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

export default LinksGrid;
