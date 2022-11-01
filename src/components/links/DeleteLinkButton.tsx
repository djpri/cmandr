import { Button } from "@chakra-ui/react";
import useLinks from "hooks/links/useLinks";
import React from "react";

function DeleteLinkButton({ linkId, onClose }) {
  const { deleteLinkMutation } = useLinks();

  return (
    <Button
      size="xs"
      variant="delete"
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
