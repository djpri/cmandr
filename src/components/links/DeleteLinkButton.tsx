import { Button } from "@chakra-ui/react";
import ConfirmActionDialog from "components/shared/ConfirmActionDialog";
import useLinks from "hooks/entities/useLinks";

interface DeleteLinkButtonProps {
  linkId: number;
  onDeleted?: () => void;
}

function DeleteLinkButton({ linkId, onDeleted }: DeleteLinkButtonProps) {
  const { deleteLinkMutation } = useLinks();

  return (
    <ConfirmActionDialog
      title="Delete link"
      body="The selected link will be permanently removed. This action cannot be undone."
      confirmLabel="Delete"
      isLoading={deleteLinkMutation.isLoading}
      onConfirm={(close) =>
        deleteLinkMutation.mutate(linkId, {
          onSettled: () => {
            close();
            onDeleted?.();
          },
        })
      }
      trigger={(onOpen) => (
        <Button
          size="xs"
          variant="delete"
          onClick={onOpen}
          isDisabled={deleteLinkMutation.isLoading}
        >
          Delete
        </Button>
      )}
    />
  );
}

export default DeleteLinkButton;
