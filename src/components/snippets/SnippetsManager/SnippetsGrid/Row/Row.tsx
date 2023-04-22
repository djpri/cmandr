import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { Row, Table } from "@tanstack/react-table";
import useTableSelectors from "hooks/table/useTableSelectors";
import { SnippetReadDto } from "models/snippets";
import { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import SnippetOptions from "./Options/SnippetOptions";

interface IProps {
  snippet: SnippetReadDto;
  showCategories: boolean;
  isLoading: boolean;
  row: Row<SnippetReadDto>;
  setReadOnlyCode: (code: string, language: string) => void;
  table: Table<SnippetReadDto>;
}

function TableRow({
  snippet,
  row,
  table,
  showCategories,
  setReadOnlyCode,
}: IProps) {
  const { description, category, language } = snippet;
  const selectedRowColor = useColorModeValue("gray.300", "blue.600");
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1280px)");
  const { multiSelectRow } = useTableSelectors<SnippetReadDto>({
    table,
    row,
    requireClickToSelect: true,
  });
  const [showOptions, setShowOptions] = useState(isSmallerThan1280);

  const languageColor = useColorModeValue("teal.800", "teal.300");
  const categoryColor = useColorModeValue("gray.800", "gray.300");

  useEffect(() => {
    setShowOptions(isSmallerThan1280);
  }, [isSmallerThan1280]);

  return (
    <Flex
      gap={[1, 1, 2, 4]}
      py={2}
      px={4}
      rounded="none"
      justifyContent="space-between"
      className="gridRow clickToSelect"
      bgColor={row.getIsSelected() && selectedRowColor}
      _hover={{
        bgColor: row.getIsSelected() && selectedRowColor,
      }}
      onMouseDown={multiSelectRow}
      onMouseEnter={() => {
        if (!isSmallerThan1280) {
          setShowOptions(true);
        }
      }}
      onMouseLeave={() => {
        if (!isSmallerThan1280) {
          setShowOptions(false);
        }
      }}
    >
      <Box className="clickToSelect">
        <Box className="clickToSelect">{description}</Box>
        <HStack className="clickToSelect">
          <Text fontWeight="700" fontSize="sm" color={languageColor}>
            {language}
          </Text>
          {showCategories && (
            <HStack>
              <AiOutlineUnorderedList />
              <Text fontSize="xs" fontWeight="500" color={categoryColor}>
                {category?.name}
              </Text>
            </HStack>
          )}
        </HStack>
      </Box>

      <Box display={showOptions && !row.getIsSelected() ? "inline" : "none"}>
        <SnippetOptions snippet={snippet} setReadOnlyCode={setReadOnlyCode} />
      </Box>
    </Flex>
  );
}

export default TableRow;
