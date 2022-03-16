import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import useCommandCategories from "hooks/useCommandCategories";
import { useState } from "react";

function EditCommandCategory({ isOpen, onClose, categoryId }) {
  const [categoryName, setCategoryName] = useState("");
  const { editCategoryMutation } = useCommandCategories();

  const editCommandRequest = {
    id: categoryId,
    body: {
      name: categoryName,
    },
  };

  const handleEdit = () => {
    editCategoryMutation.mutate(editCommandRequest);
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
            bgColor="yellow.500"
            color="white"
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

export default EditCommandCategory;
