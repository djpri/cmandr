import { Button } from "@chakra-ui/react";
import useCommands from "hooks/useCommands";
import * as React from "react";

function DeleteCommandButton({ commandId, onClose }) {
  const { deleteCommandMutation } = useCommands(null);

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
