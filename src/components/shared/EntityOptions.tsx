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
  useColorModeValue,
} from "@chakra-ui/react";
import { UseMutationResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

interface EntityOptionsProps {
  entityType: "command" | "link" | "snippet";
  entityId: number;
  deleteButton: JSX.Element;
  editForm: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  isStarred: boolean;
  addToFavoritesMutation: UseMutationResult<unknown, unknown, number>;
  removeFromFavoritesMutation: UseMutationResult<unknown, unknown, number>;
}

function EntityOptions({
  entityType,
  deleteButton,
  editForm,
  isOpen,
  entityId,
  isStarred,
  onClose,
  onOpen,
  addToFavoritesMutation,
  removeFromFavoritesMutation,
}: EntityOptionsProps) {
  const [isStarredState, setIsStarredState] = useState(isStarred);

  const starColor = useColorModeValue("yellow.700", "yellow.500");

  useEffect(() => {
    setIsStarredState(isStarred);
  }, [isStarred]);

  const handleClick = async () => {
    if (isStarred) {
      await removeFromFavoritesMutation.mutateAsync(entityId);
      setIsStarredState(false);
    } else {
      await addToFavoritesMutation.mutateAsync(entityId);
      setIsStarredState(true);
    }
  };

  return (
    <HStack m="0">
      <HStack>
        <Tooltip
          label={isStarredState ? "Remove from favorites" : "Add to favorites"}
          openDelay={500}
        >
          <IconButton
            size="xs"
            color={isStarredState ? starColor : "gray.300"}
            icon={<FaStar />}
            onClick={handleClick}
            aria-label={`Star ${entityType}`}
          />
        </Tooltip>
        <IconButton
          size="xs"
          onClick={onOpen}
          icon={<AiFillEdit />}
          aria-label={`Edit ${entityType}`}
        />
          {deleteButton}
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
