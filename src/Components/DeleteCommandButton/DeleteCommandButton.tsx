import { Button } from "@chakra-ui/react";
import * as React from "react";
import { useDeleteCommand } from "../../services/commands/deleteCommandInDB";

function DeleteCommandButton({ commandId, onClose }) {
  const { deleteCommandInDB } = useDeleteCommand();

  return (
    <Button
      size="xs"
      bgColor="red.500"
      color="white"
      onClick={() => {
        deleteCommandInDB(commandId);
        onClose();
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteCommandButton;
