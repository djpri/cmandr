import { Box, Grid } from "@chakra-ui/react";
import { CommandSortFunction } from "helpers/commandsSortFunctions";
import { CommandReadDto } from "models/command";
import React, { Key, useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import Header from "./Header/Header";
import Row from "./Row/Row";

interface IProps {
  commands: CommandReadDto[];
  showCategories: boolean;
  sortFunction?: (a: CommandReadDto, b: CommandReadDto) => 1 | -1;
  setSortFunction?: React.Dispatch<React.SetStateAction<CommandSortFunction>>;
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

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable({ columns, data }, useSortBy, usePagination);

  return (
    <Box
      p="1"
      display="flex"
      flexDirection="column"
      w="100%"
      {...getTableProps()}
    >
      <Grid
        templateColumns={["1fr", null, null, "1.7fr 2fr 1fr 1fr"]}
        p="4"
        gap={4}
        rounded="md"
      >
        {
          // Loop over the headers in each row
          headerGroups[0].headers.map((column, index) => (
            // Apply the header cell props
            <Header key={index} label={column.render("Header")} />
          ))
        }
      </Grid>

      <Box w="100%" {...getTableBodyProps()}>
        {page.map((row, index: Key) => {
          prepareRow(row);
          return (
            <Row
              showCategories={showCategories}
              commandItem={row.values}
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
