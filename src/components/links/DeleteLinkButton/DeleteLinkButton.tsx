import { Button } from "@chakra-ui/react";
import useLinks from "hooks/useLinks";
import React from "react";

function DeleteLinkButton({ linkId, onClose }) {
  const { deleteLinkMutation } = useLinks("");

  return (
    <Button
      size="xs"
      bgColor="red.500"
      color="white"
      onClick={() => {
        deleteLinkMutation.mutate(linkId);
        onClose();
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteLinkButton;
