import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

function DeleteCategoryModal({ isOpen, onClose, categoryName }) {
  const history = useHistory();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete "{categoryName}" commands</ModalHeader>
        <ModalCloseButton />
        <ModalBody>WARNING! This action cannot be undone.</ModalBody>

        <ModalFooter>
          <Button bgColor="blue.500" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            bgColor="red.500"
            onClick={() => {
              onClose();
              history.push("/commands");
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteCategoryModal;
