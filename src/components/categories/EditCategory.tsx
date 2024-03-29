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
import useCategories from "hooks/categories/useCategories";
import { CategoryReadDto, CategoryUpdateDto } from "models/category";
import { Entity } from "models/entity";
import { useMemo, useState } from "react";

interface EditCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  category: CategoryReadDto;
  entityType: Entity;
}

function EditCategory({
  isOpen,
  onClose,
  category,
  entityType,
}: EditCategoryProps) {
  const [categoryName, setCategoryName] = useState("");
  const { editCategoryMutation } = useCategories(entityType);

  const categoryUpdateDto: CategoryUpdateDto = useMemo(() => {
    return {
      name: categoryName || category.name,
      parentId: category.parentId,
      isGroup: category.isGroup,
      displayIndex: category.displayIndex,
    };
  }, [category, categoryName]);

  const handleEdit = () => {
    editCategoryMutation.mutate({ id: category.id, body: categoryUpdateDto });
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

export default EditCategory;
