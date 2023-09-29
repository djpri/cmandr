import {
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

interface EntityOptionsProps {
  entityType: "command" | "link" | "snippet";
  deleteButton: JSX.Element;
  editForm: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  isStarred: boolean;
}

function EntityOptions({
  entityType,
  deleteButton,
  editForm,
  isOpen,
  isStarred,
  onClose,
  onOpen,
}: EntityOptionsProps) {
  const [isStarredState, setIsStarredState] = useState(isStarred);

  useEffect(() => {
    setIsStarredState(isStarred);
  }, [isStarred])
  
  return (
    <HStack m="0">
      <HStack>
        <Tooltip label="Add to favorites" openDelay={500}>
          <IconButton
            size="xs"
            icon={<FaStar color={isStarredState ? "yellow" : "gray"} />}
            onClick={() => {
              setIsStarredState(!isStarredState);
            }}
            aria-label={`Star ${entityType}`}
          />
        </Tooltip>
        <IconButton
          size="xs"
          onClick={onOpen}
          icon={<AiFillEdit />}
          aria-label={`Edit ${entityType}`}
        />
        <Tooltip label={"Delete item"} openDelay={500}>{deleteButton}</Tooltip>
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={entityType === "snippet" ? "full" : "xl"}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(5px) hue-rotate(-20deg)"
        />
        <ModalContent>
          <ModalHeader textTransform="capitalize">
            Edit {entityType}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{editForm}</ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
}

export default EntityOptions;
