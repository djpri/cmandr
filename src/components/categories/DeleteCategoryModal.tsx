import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import useCategories from "hooks/categories/useCategories";
import { Entity } from "models/entity";
import { useNavigate } from "react-router-dom";

interface IProps {
  isOpen: boolean;
  onClose: () => void | null;
  categoryName: string;
  categoryId: number;
  entityType: Entity;
}

function DeleteCategoryModal({
  isOpen,
  onClose,
  categoryName,
  categoryId,
  entityType,
}: IProps) {
  const navigate = useNavigate();
  const { deleteCategoryMutation } = useCategories(entityType);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {`"${categoryName}" ${entityType}s`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>WARNING! This action cannot be undone.</ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={() => {
              onClose();
              navigate("/dashboard");
              deleteCategoryMutation.mutate(categoryId);
            }}
            variant="delete"
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteCategoryModal;
