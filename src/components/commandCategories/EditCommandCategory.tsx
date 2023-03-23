import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import useCommandCategories from "hooks/commands/useCommandCategories";
import { CategoryUpdateDto } from "models/category";
import { useMemo, useState } from "react";

interface EditCommandCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: number;
  category: CategoryUpdateDto;
}

function EditCommandCategory({ isOpen, onClose, categoryId, category }: EditCommandCategoryProps) {
  const [categoryName, setCategoryName] = useState("");
  const { editCategoryMutation } = useCommandCategories();

  const categoryUpdateDto: CategoryUpdateDto = useMemo(() => {
    return {
      name: category.name,
      parentId: category.parentId,
      isGroup: category.isGroup,
    }
  }, [category]);

  const handleEdit = () => {
    editCategoryMutation.mutate({ id: categoryId, body: categoryUpdateDto });
    setCategoryName("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter new name of category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={handleEdit} isDisabled={categoryName === ""}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditCommandCategory;
