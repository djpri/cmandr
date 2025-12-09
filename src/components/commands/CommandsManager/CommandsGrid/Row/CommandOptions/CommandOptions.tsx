import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import EditCommandForm from "components/commands/EditCommandForm/EditCommandForm";
import ConfirmActionDialog from "components/shared/ConfirmActionDialog";
import EntityOptions from "components/shared/EntityOptions";
import useCommands from "hooks/entities/useCommands";
import { CommandReadDto } from "models/command";
import { AiFillDelete } from "react-icons/ai";

type IProps = {
  command: CommandReadDto;
};

interface DeleteCommandButtonProps {
  commandId: number;
}

function DeleteCommandButton({ commandId }: DeleteCommandButtonProps) {
  const { deleteCommandMutation } = useCommands();

  return (
    <ConfirmActionDialog
      title="Delete command"
      body="This command will be permanently removed. This action cannot be undone."
      confirmLabel="Delete"
      isLoading={deleteCommandMutation.isLoading}
      onConfirm={(close) =>
        deleteCommandMutation.mutate(commandId, { onSettled: close })
      }
      trigger={(onOpen) => (
        <Tooltip label="Delete command" openDelay={500}>
          <IconButton
            size="xs"
            aria-label="Delete command"
            variant="delete"
            icon={<AiFillDelete />}
            onClick={onOpen}
            isDisabled={deleteCommandMutation.isLoading}
          />
        </Tooltip>
      )}
    />
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
      deleteButton={<DeleteCommandButton commandId={command.id} />}
      editForm={<EditCommandForm commandItem={command} onClose={onClose} />}
    ></EntityOptions>
  );
}

export default CommandOptions;
