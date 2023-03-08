import { Box, HStack, useColorModeValue, Wrap } from "@chakra-ui/react";
import ErrorBoundaryWrapper from "components/other/ErrorBoundary";
import { ForwardedRef, useRef, useState } from "react";
import { LinkReadDto } from "../../../models/link";
import AddLinkButton from "./AddLinkButton";
import LinksTable from "./LinksGrid/LinksGrid";
import AddQuickLink from "./QuickAddLinkButton";

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
          </Wrap>
          <Box ref={addLinkref} />
          <Box ref={quickAddLinkref} />
        </Box>
        {links?.length > 0 && (
          <LinksTable
            isLoading={false}
            links={links}
            showCategories={!categoryId}
          />
        )}
      </Box>
    </ErrorBoundaryWrapper>
  );
}

export default LinksManager;
