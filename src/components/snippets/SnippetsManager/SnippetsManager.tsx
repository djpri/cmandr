import { Box, useColorModeValue } from "@chakra-ui/react";
import ErrorBoundaryWrapper from "components/other/ErrorBoundary";
import SnippetsGrid from "./SnippetsGrid/SnippetsGrid";
import { SnippetReadDto } from "models/snippets";

interface IProps {
  categoryId?: number;
  snippets: SnippetReadDto[];
}

function SnippetsManager({ categoryId, snippets }: IProps) {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("0", "1px");

  return (
    <ErrorBoundaryWrapper>
      <Box
        boxShadow="base"
        rounded="md"
        border={border}
        borderColor="gray.700"
        bgColor={bgColor}
        position="relative"
      >
        {snippets?.length > 0 && (
          <SnippetsGrid
            isLoading={false}
            snippets={snippets}
            showCategories={!categoryId}
          />
        )}
      </Box>
    </ErrorBoundaryWrapper>
  );
}

export default SnippetsManager;
