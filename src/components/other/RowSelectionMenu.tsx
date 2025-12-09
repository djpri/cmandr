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
import ConfirmActionDialog from "components/shared/ConfirmActionDialog";
import { isInDevelopment } from "helpers/environment";
import useCommands from "hooks/entities/useCommands";
import useLinks from "hooks/entities/useLinks";
import { FC, useCallback, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiMove } from "react-icons/bi";
import UseCategories from "../../hooks/categories/useCategories";
import { Entity, EntityReadDto } from "models/entity";
import { CommandReadDto } from "models/command";
import { LinkReadDto } from "models/link";

interface IProps {
  handleBulkDelete?: (onComplete: () => void) => void;
  isDeleting?: boolean;
  type: Entity;
  table: Table<CommandReadDto> | Table<LinkReadDto>;
}

interface MoveItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: Entity;
  items: EntityReadDto[];
  clearSelection: (value?: boolean) => void;
}

const MoveItemsModal: FC<MoveItemsModalProps> = ({
  isOpen,
  onClose,
  type,
  items,
  clearSelection,
}) => {
  const useCategories = UseCategories(type);
  const mutationHook = {
    command: useCommands().editMultipleCommandsMutation,
    link: useLinks().editMultipleLinksMutation,
  };
  const mutation = mutationHook[type];
  const categories = useCategories.query.data;

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

const RowSelectionMenu: FC<IProps> = ({
  handleBulkDelete,
  isDeleting = false,
  table,
  type,
}) => {
  const selectedRowsInfoColor = useColorModeValue("gray.300", "#413b77");
  const selectedRowsTextColor = useColorModeValue("black", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedCount = table.getSelectedRowModel().flatRows.length;

  const handleConfirmBulkDelete = (close: () => void) => {
    if (!handleBulkDelete) {
      return;
    }
    handleBulkDelete(() => {
      close();
    });
  };

  return (
    <Flex
      p={5}
      bgColor={selectedRowsInfoColor}
      color={selectedRowsTextColor}
      rounded="none"
      mb={4}
      justify="space-between"
      align="center"
      wrap="wrap"
      gap={2}
    >
      <Text>{selectedCount} items selected</Text>
      <HStack>
        <Button
          onClick={() => table.toggleAllRowsSelected(false)}
          size={["xs", null, null, "sm"]}
        >
          Clear Selection
        </Button>
        <Button
          onClick={onOpen}
          aria-label="move items"
          rightIcon={<BiMove />}
          size={["xs", null, null, "sm"]}
        >
          Move
        </Button>
        <ConfirmActionDialog
          title={`Delete ${selectedCount} ${type}${selectedCount === 1 ? "" : "s"}?`}
          body="This will permanently delete the selected items."
          confirmLabel="Delete"
          isLoading={isDeleting}
          onConfirm={handleConfirmBulkDelete}
          trigger={(onOpenDelete) => (
            <Button
              onClick={onOpenDelete}
              rightIcon={<AiFillDelete />}
              size={["xs", null, null, "sm"]}
              isDisabled={!handleBulkDelete}
            >
              Delete
            </Button>
          )}
        />
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
