import { Button } from "@chakra-ui/react";
import useSnippets from "hooks/entities/useSnippets";

interface DeleteLinkButtonProps {
  linkId: number;
  onClose: () => void;
}

function DeleteSnippetButton({ linkId, onClose }: DeleteLinkButtonProps) {
  const { deleteSnippetMutation } = useSnippets();

  return (
    <Button
      size="xs"
      variant="delete"
      onClick={() => {
        deleteSnippetMutation.mutate(linkId);
        onClose();
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteSnippetButton;
