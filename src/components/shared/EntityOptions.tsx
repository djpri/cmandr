import {
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";

interface EntityOptionsProps {
  entityType: "command" | "link" | "snippet";
  deleteButton: JSX.Element;
  editForm: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

function EntityOptions({
  entityType,
  deleteButton,
  editForm,
  isOpen,
  onClose,
  onOpen,
}: EntityOptionsProps) {
  return (
    <HStack m="0">
      <HStack>
        <IconButton
          size="xs"
          onClick={onOpen}
          icon={<AiFillEdit />}
          aria-label={`Edit ${entityType}`}
        />
        {deleteButton}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(5px) hue-rotate(20deg)"
        />
        <ModalContent>
          <ModalHeader textTransform="capitalize">Edit {entityType}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{editForm}</ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
}

export default EntityOptions;
