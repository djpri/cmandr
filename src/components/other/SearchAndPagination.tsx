import { Box, Button, chakra, Flex } from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";
import { CommandReadDto } from "models/command";
import { LinkReadDto } from "models/link";
import {
  CgChevronDoubleLeft,
  CgChevronDoubleRight,
  CgChevronLeft,
  CgChevronRight,
} from "react-icons/cg";
import GlobalFilter from "./GlobalFilter";

interface IProps {
  table: Table<CommandReadDto> | Table<LinkReadDto>;
  value: string | number;
  onChange: (value: string | number) => void;
}

const SearchAndPagination = ({ table, value, onChange }: IProps) => {
  return (
    <Flex
      pl="4"
      py="3"
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
    >
      <GlobalFilter table={table} value={value} onChange={onChange} />
      <Box pr="2rem">
        <Button
          aria-label="goToFirstPage"
          onClick={() => table.setPageIndex(0)}
          isDisabled={!table.getCanPreviousPage()}
        >
          <CgChevronDoubleLeft />
        </Button>{" "}
        <Button
          aria-label="goToPreviousPage"
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          <CgChevronLeft />
        </Button>{" "}
        <Button
          aria-label="goToNextPage"
          onClick={() => {
            table.nextPage();
          }}
          isDisabled={!table.getCanNextPage()}
        >
          <CgChevronRight />
        </Button>{" "}
        <Button
          aria-label="goToLastPage"
          mr="1rem"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          isDisabled={!table.getCanNextPage()}
        >
          <CgChevronDoubleRight />
        </Button>{" "}
        <chakra.span justifySelf="flex-end">
          Page{" "}
          <b>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </b>{" "}
        </chakra.span>
      </Box>
    </Flex>
  );
};

export default SearchAndPagination;
