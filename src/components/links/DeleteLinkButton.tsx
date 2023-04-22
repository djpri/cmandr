import { Button } from "@chakra-ui/react";
import useLinks from "hooks/entities/useLinks";

interface DeleteLinkButtonProps {
  linkId: number;
  onClose: () => void;
}

function DeleteLinkButton({ linkId, onClose }: DeleteLinkButtonProps) {
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
