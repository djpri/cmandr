import { Box, Button, chakra, Flex } from "@chakra-ui/react";
import {
  CgChevronDoubleLeft,
  CgChevronDoubleRight,
  CgChevronLeft,
  CgChevronRight,
} from "react-icons/cg";
import GlobalFilter from "./GlobalFilter";

const SearchAndPagination = ({
  preGlobalFilteredRows,
  canPreviousPage,
  canNextPage,
  state,
  gotoPage,
  previousPage,
  nextPage,
  setGlobalFilter,
  pageCount,
  pageIndex,
  pageOptions,
}) => {
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

export default SearchAndPagination;
