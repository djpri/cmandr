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
import { useNavigate } from "react-router-dom";
import { deleteLinkCategoryInDB } from "../../../api/handlers/linkCategories/deleteLinkCategoryInDB";

interface IProps {
  isOpen: boolean;
  onClose: () => void | null;
  categoryName: string;
  categoryId: number;
}

function DeleteLinkCategory({
  isOpen,
  onClose,
  categoryName,
  categoryId,
}: IProps) {
  let navigate = useNavigate();
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
              navigate("/links");
              dispatch(deleteLinkCategoryInDB(categoryId));
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteLinkCategory;
