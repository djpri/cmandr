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
import { useState } from "react";

function EditLinkCategory({ isOpen, onClose, categoryId }) {
  const [categoryName, setCategoryName] = useState("");
  const { editCategoryMutation } = useLinkCategories();

  const handleEdit = () => {
    editCategoryMutation.mutate({
      id: categoryId,
      body: { name: categoryName },
    });
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
          <Button
            variant="save"
            mr={3}
            onClick={handleEdit}
            isDisabled={categoryName === ""}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditLinkCategory;
