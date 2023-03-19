import {
  Flex,
  HStack,
  Button,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";
import { CommandReadDto } from "models/command";
import { LinkReadDto } from "models/link";
import { FC } from "react";

interface IProps {
  handleBulkDelete: () => void;
  table: Table<any>;
}

const RowSelectionMenu: FC<IProps> = ({
  handleBulkDelete,
  table
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
      <Text>{table.getSelectedRowModel().flatRows.length} items selected</Text>
      <HStack>
        <Button onClick={() => table.toggleAllRowsSelected(false)}>
          Clear Selection
        </Button>
        <Button onClick={handleBulkDelete}>Delete</Button>
      </HStack>
    </Flex>
  );
};

export default RowSelectionMenu;
