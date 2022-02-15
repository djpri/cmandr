import { Button } from "@chakra-ui/react";
import React from "react";
import { useDeleteLink } from "../../../api/handlers/links/deleteLinkInDB";

function DeleteLinkButton({ linkId, onClose }) {
  const { deleteLinkInDB } = useDeleteLink();

  return (
    <Button
      size="xs"
      bgColor="red.500"
      color="white"
      onClick={() => {
        deleteLinkInDB(linkId);
        onClose();
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteLinkButton;
