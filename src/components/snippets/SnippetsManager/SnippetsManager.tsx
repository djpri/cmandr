import { Box, HStack, useColorModeValue, Wrap } from "@chakra-ui/react";
import ErrorBoundaryWrapper from "components/other/ErrorBoundary";
import { ForwardedRef, useRef, useState } from "react";
import AddSnippetButton from "./AddSnippetButton";
import SnippetsGrid from "./SnippetsGrid/SnippetsGrid";
import { SnippetReadDto } from "models/snippets";

interface IProps {
  categoryId?: number;
  snippets: SnippetReadDto[];
}

function SnippetsManager({ categoryId, snippets }: IProps) {
  const addSnippetRef = useRef<HTMLDivElement | null>(null);
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("0", "1px");
  const [currentButtonOpen, setCurrentButtonOpen] = useState<
    "addSnippet" | "quickAddLink" | "none"
  >("none");
  return (
    <ErrorBoundaryWrapper>
      <Box
        boxShadow="base"
        rounded="md"
        border={border}
        borderColor="gray.700"
        bgColor={bgColor}
        position="relative"
        mb="40"
      >
        <Box zIndex="100" mb="2" pt="5" pl="5" pr="5">
          <Wrap justify="space-between" align="center" mb="3" w="100%">
            <HStack>
              <AddSnippetButton
                ref={addSnippetRef as ForwardedRef<HTMLDivElement>}
                categoryId={categoryId}
                currentButtonOpen={currentButtonOpen}
                setCurrentButtonOpen={setCurrentButtonOpen}
              />
            </HStack>
          </Wrap>
          <Box ref={addSnippetRef} />
        </Box>
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
