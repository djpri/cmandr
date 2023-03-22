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
import useLinkCategories from "hooks/links/useLinkCategories";
import { CategoryUpdateDto } from "models/category";
import { useMemo, useState } from "react";

function EditLinkCategory({ isOpen, onClose, category }) {
  const [categoryName, setCategoryName] = useState("");
  const { editCategoryMutation } = useLinkCategories();

  const categoryUpdateDto: CategoryUpdateDto = useMemo(() => {
    return {
      name: category.name,
      parentId: category.parentId,
      isGroup: category.isGroup,
    }
  }, [category]);

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

export default EditLinkCategory;
