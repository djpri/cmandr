import {
  Flex,
  HStack,
  Button,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

interface IProps {
  selectedFlatRows: never[];
  handleBulkDelete: () => void;
  toggleAllRowsSelected: (set?: boolean) => void;
}

const RowSelectionMenu: FC<IProps> = ({
  selectedFlatRows,
  handleBulkDelete,
  toggleAllRowsSelected,
}) => {
  const selectedRowsInfoColor = useColorModeValue("gray.400", "blue.600");

  return (
    <Flex
      p={5}
      bgColor={selectedRowsInfoColor}
      color="white"
      rounded="none"
      mb={4}
      justify="space-between"
      align="center"
    >
      <Text>{selectedFlatRows.length} items selected</Text>
      <HStack>
        <Button onClick={() => toggleAllRowsSelected(false)}>
          Clear Selection
        </Button>
        <Button onClick={handleBulkDelete}>Delete</Button>
      </HStack>
    </Flex>
  );
};

export default RowSelectionMenu;
