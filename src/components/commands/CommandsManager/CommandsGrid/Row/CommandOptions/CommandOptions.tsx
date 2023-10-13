import { IconButton, useDisclosure } from "@chakra-ui/react";
import EditCommandForm from "components/commands/EditCommandForm/EditCommandForm";
import EntityOptions from "components/shared/EntityOptions";
import useCommands from "hooks/entities/useCommands";
import { CommandReadDto } from "models/command";
import { AiFillDelete } from "react-icons/ai";

type IProps = {
  command: CommandReadDto;
};

interface DeleteCommandButtonProps {
  commandId: number;
  onClose: () => void;
}

function DeleteCommandButton({ commandId, onClose }: DeleteCommandButtonProps) {
  const {
    deleteCommandMutation,
  } = useCommands();

  return (
    <IconButton
      size="xs"
      aria-label="Delete command"
      variant="delete"
      icon={<AiFillDelete />}
      onClick={() => {
        deleteCommandMutation.mutate(commandId);
        onClose();
      }}
    >
      Delete
    </IconButton>
  );
}

function CommandOptions({ command }: IProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { addToFavoritesMutation, removeFromFavoritesMutation } = useCommands();

  return (
    <EntityOptions
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      entityType="command"
      entityId={command.id}
      isStarred={command?.starred}
      addToFavoritesMutation={addToFavoritesMutation}
      removeFromFavoritesMutation={removeFromFavoritesMutation}
      deleteButton={
        <DeleteCommandButton commandId={command.id} onClose={onClose} />
      }
      editForm={<EditCommandForm commandItem={command} onClose={onClose} />}
    ></EntityOptions>
  );
}

export default CommandOptions;
