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
import { useNavigate } from "react-router-dom";
import useLinkCategories from "../../hooks/links/useLinkCategories";

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
  const navigate = useNavigate();
  const { deleteCategoryMutation } = useLinkCategories();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {`"${categoryName}"`} links</ModalHeader>
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

export default DeleteLinkCategory;
