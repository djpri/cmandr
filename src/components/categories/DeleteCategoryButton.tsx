import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import useCategories from "hooks/categories/useCategories";
import { Entity } from "models/entity";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface IProps {
  categoryName: string;
  categoryId: number;
  entityType: Entity;
}

function DeleteCategoryButton({
  categoryName,
  categoryId,
  entityType,
}: IProps) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteCategoryMutation } = useCategories(entityType);
  return (
    <>
      <Tooltip label="Delete category" openDelay={500}>
        <IconButton
          size="sm"
          onClick={onOpen}
          variant="delete"
          icon={<AiFillDelete />}
          aria-label="delete-category"
        />
      </Tooltip>
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
    </>
  );
}

export default DeleteCategoryButton;
