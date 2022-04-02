import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import ErrorBoundaryWrapper from "components/other/ErrorBoundary";
import useLinksFilter from "hooks/links/useLinksFilter";
import { ForwardedRef, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { LinkReadDto } from "../../../models/link";
import AddLinkButton from "./AddLinkButton/AddLinkButton";
import AddQuickLink from "./QuickAddLinkButton/QuickAddLinkButton";
import LinksTable from "./LinksGrid/LinksGrid";

interface IProps {
  categoryId?: number;
  links: LinkReadDto[];
}

function LinksManager({ categoryId, links }: IProps) {
  const addLinkref = useRef<HTMLDivElement | null>(null);
  const quickAddLinkref = useRef<HTMLDivElement | null>(null);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("0", "1px");
  const [currentButtonOpen, setCurrentButtonOpen] = useState<
    "addLink" | "quickAddLink" | "none"
  >("none");
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
            <HStack>
              <AddLinkButton
                ref={addLinkref as ForwardedRef<HTMLDivElement>}
                categoryId={categoryId}
                currentButtonOpen={currentButtonOpen}
                setCurrentButtonOpen={setCurrentButtonOpen}
              />
              <AddQuickLink
                ref={quickAddLinkref as ForwardedRef<HTMLDivElement>}
                categoryId={categoryId}
                currentButtonOpen={currentButtonOpen}
                setCurrentButtonOpen={setCurrentButtonOpen}
              />
            </HStack>
            {/* SEARCH BAR */}
            <InputGroup maxW="md" w={["xs", "xs", "sm", "md"]}>
              <Input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
          <Box ref={addLinkref} />
          <Box ref={quickAddLinkref} />
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
