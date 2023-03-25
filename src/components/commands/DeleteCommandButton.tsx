import { Button } from "@chakra-ui/react";
import useCommands from "hooks/commands/useCommands";

interface DeleteCommandButtonProps {
  commandId: number;
  onClose: () => void;
}

function DeleteCommandButton({ commandId, onClose }: DeleteCommandButtonProps) {
  const { deleteCommandMutation } = useCommands();

  return (
    <Button
      size="xs"
      variant="delete"
      onClick={() => {
        deleteCommandMutation.mutate(commandId);
        onClose();
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteCommandButton;
