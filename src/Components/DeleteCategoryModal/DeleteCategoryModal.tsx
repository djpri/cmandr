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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteCommandCategoryInDB } from "../../services/commandCategories/deleteCommandCategoryInDB";

interface IProps {
  isOpen: boolean;
  onClose: () => void | null;
  categoryName: string;
  categoryId: number;
}

function DeleteCategoryModal({
  isOpen,
  onClose,
  categoryName,
  categoryId,
}: IProps) {
  const history = useHistory();
  const dispatch = useDispatch();
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
              dispatch(deleteCommandCategoryInDB(categoryId));
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
