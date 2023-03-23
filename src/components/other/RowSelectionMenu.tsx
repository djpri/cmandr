import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";
import { isInDevelopment } from "helpers/environment";
import useCommandCategories from "hooks/commands/useCommandCategories";
import useCommands from "hooks/commands/useCommands";
import useLinkCategories from "hooks/links/useLinkCategories";
import useLinks from "hooks/links/useLinks";
import { CommandReadDto } from "models/command";
import { LinkReadDto } from "models/link";
import { FC, useCallback, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface IProps {
  handleBulkDelete: () => void;
  table: Table<CommandReadDto> | Table<LinkReadDto>;
  type: "command" | "link";
}

interface MoveItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "command" | "link";
  items: CommandReadDto[] | LinkReadDto[];
  clearSelection: (value?: boolean) => void;
}

const MoveItemsModal: FC<MoveItemsModalProps> = ({
  isOpen,
  onClose,
  type,
  items,
  clearSelection,
}) => {
  const useCategories =
    type === "command" ? useCommandCategories() : useLinkCategories();
  const categories = useCategories.query.data;
  const mutation =
    type === "command"
      ? useCommands().editMultipleCommandsMutation
      : useLinks().editMultipleLinksMutation;

  const [newCategoryId, setNewCategoryId] = useState(-1);

  const changesArray: (newCategoryId: number) => number[][] = useCallback(
    (newCategoryId) => {
      return items.map((item) => [item.id, newCategoryId]);
    },
    [newCategoryId]
  );

  const onSubmit = () => {
    mutation.mutate({ body: changesArray(newCategoryId) });
    clearSelection();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          Move to new category
        </ModalHeader>
        <ModalBody>
          <Select
            onChange={(e) => {
              setNewCategoryId(Number(e.target.value));
            }}
            value={newCategoryId}
          >
            <option value={-1}>Select Category</option>
            {categories &&
              categories
                .filter((category) => category.isGroup === false)
                .map((category) => (
                  <option value={category.id} key={category.id}>
                    {isInDevelopment && `(${category.id}) `}
                    {category.name}
                  </option>
                ))}
          </Select>
          <Button my={4} onClick={onSubmit}>
            Move
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const RowSelectionMenu: FC<IProps> = ({ handleBulkDelete, table, type }) => {
  const selectedRowsInfoColor = useColorModeValue("gray.400", "blue.600");
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Button onClick={onOpen}>
          Move
          <FaArrowRight />
        </Button>
        <Button onClick={handleBulkDelete}>Delete</Button>
      </HStack>
      <MoveItemsModal
        isOpen={isOpen}
        onClose={onClose}
        clearSelection={() => table.toggleAllRowsSelected(false)}
        type={type}
        items={table.getSelectedRowModel().flatRows.map((row) => row.original)}
      />
    </Flex>
  );
};

export default RowSelectionMenu;
