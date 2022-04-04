import { Box, useColorModeValue } from "@chakra-ui/react";
import ErrorBoundaryWrapper from "components/other/ErrorBoundary";
import { CommandReadDto } from "models/command";
import { useRef } from "react";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import CommandsTable from "./CommandsGrid/CommandsGrid";

interface IProps {
  categoryId?: number;
  commands: CommandReadDto[];
}

function CommandsManager({ categoryId, commands }: IProps) {
  const ref = useRef(null);
  const bgColor = useColorModeValue("#f2f6fa", "gray.800");
  const border = useColorModeValue("0", "1px");

  return (
    <ErrorBoundaryWrapper>
      <Box
        maxW="container.xl"
        w={["100%", null, null, null, "container.xl"]}
        boxShadow="base"
        rounded="md"
        border={border}
        borderColor="gray.700"
        bgColor={bgColor}
        position="relative"
      >
        <Box zIndex="100" pt="4" pb="2" pl="5" pr="5">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="3"
          >
            <AddCommandButton ref={ref} categoryId={categoryId} />
          </Box>
          <Box ref={ref} />
        </Box>
        {commands && (
          <CommandsTable commands={commands} showCategories={!categoryId} />
        )}
      </Box>
    </ErrorBoundaryWrapper>
  );
}

export default CommandsManager;
