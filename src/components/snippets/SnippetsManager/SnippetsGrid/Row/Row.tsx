import { Box, Button, Flex, HStack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { Row, Table } from "@tanstack/react-table";
import useTableSelectors from "hooks/table/useTableSelectors";
import { SnippetReadDto } from "models/snippets";
import { selectShowImagePreviews } from "redux/slices/linksSlice";
import { useAppSelector } from "redux/store";
import SnippetOptions from "./LinkOptions/SnippetOptions";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useState } from "react";

interface IProps {
  snippet: SnippetReadDto;
  showCategories: boolean;
  isLoading: boolean;
  row: Row<SnippetReadDto>;
  table: Table<SnippetReadDto>;
}

function TableRow({ snippet, row, table, showCategories }: IProps) {
  const { description, category, language } = snippet;
  const showImagePreviews = useAppSelector(selectShowImagePreviews);
  const selectedRowColor = useColorModeValue("gray.300", "blue.600");
  const { multiSelectRow } = useTableSelectors<SnippetReadDto>(table, row);
  const [showOptions, setShowOptions] = useState(false);

  const languageColor = useColorModeValue("teal.800", "teal.300");
  const categoryColor = useColorModeValue("gray.800", "gray.300");

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
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <Box>
        <Box className="clickToSelect">
          <p>{description}</p>
        </Box>
        <HStack>
        <Text fontWeight="700" fontSize="sm" color={languageColor}>{language}</Text>
        {showCategories && <HStack>
          <AiOutlineUnorderedList />
          <Text fontSize="xs" fontWeight="500" color={categoryColor}>{category?.name}</Text>
        </HStack>}
        </HStack>
      </Box>


      <Box display={(showOptions && !row.getIsSelected()) ? "inline" : "none"}>
        <SnippetOptions snippet={snippet} />
      </Box>
    </Flex>
  );
}

export default TableRow;
