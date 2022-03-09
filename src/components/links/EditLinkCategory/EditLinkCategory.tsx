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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editLinkCategoryInDB } from "../../../api/handlers/linkCategories/editLinkCategoryInDB";

function EditLinkCategory({ isOpen, onClose, categoryId }) {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editLinkCategoryInDB(categoryId, categoryName));
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

export default EditLinkCategory;
