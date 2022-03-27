import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import ErrorBoundaryWrapper from "components/other/ErrorBoundary";
import useLinksFilter from "hooks/links/useLinksFilter";
import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { LinkReadDto } from "../../../models/link";
import AddLinkButton from "./AddLinkButton/AddLinkButton";
import LinksTable from "./LinksGrid/LinksGrid";

interface IProps {
  categoryId?: number;
  links: LinkReadDto[];
}

function LinksManager({ categoryId, links }: IProps) {
  const ref = useRef(null);
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("0", "1px");

  const { filteredLinks, search, setSearch, sortFunction, setSortFunction } =
    useLinksFilter(links);

  return (
    <ErrorBoundaryWrapper>
      <Box
        minW="container.xl"
        maxW="container.xl"
        w={["100%", null, null, "container.xl"]}
        boxShadow="base"
        rounded="md"
        border={border}
        borderColor="gray.700"
        bgColor={bgColor}
        position="relative"
        mb="40"
      >
        <Box zIndex="100" mb="2" pt="5" pl="5" pr="5">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="3"
          >
            <AddLinkButton ref={ref} categoryId={categoryId} />
            {/* SEARCH BAR */}
            <InputGroup maxW="md" w={["xs", "xs", "sm", "md"]}>
              <Input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                mb="5"
              />
              <InputRightElement
                children={
                  <IconButton
                    size="sm"
                    aria-label="search-button"
                    icon={<AiOutlineSearch color="gray.300" />}
                  />
                }
              />
            </InputGroup>
          </Box>
          <Box ref={ref} />
        </Box>
        <LinksTable
          isLoading={false}
          links={filteredLinks}
          showCategories={!categoryId}
          sortFunction={sortFunction}
          setSortFunction={setSortFunction}
        />
      </Box>
    </ErrorBoundaryWrapper>
  );
}

export default LinksManager;
