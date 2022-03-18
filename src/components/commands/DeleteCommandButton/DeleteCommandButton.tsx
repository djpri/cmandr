import { Button } from "@chakra-ui/react";
import useCommands from "hooks/commands/useCommands";

function DeleteCommandButton({ commandId, onClose }) {
  const { deleteCommandMutation } = useCommands();

  return (
    <Button
      size="xs"
      bgColor="red.500"
      color="white"
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
