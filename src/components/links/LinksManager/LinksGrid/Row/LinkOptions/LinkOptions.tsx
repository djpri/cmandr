import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import EditLinkForm from "components/links/EditLinkForm/EditLinkForm";
import ConfirmActionDialog from "components/shared/ConfirmActionDialog";
import EntityOptions from "components/shared/EntityOptions";
import useLinks from "hooks/entities/useLinks";
import { LinkReadDto } from "models/link";
import { AiFillDelete } from "react-icons/ai";

type IProps = {
  link: LinkReadDto;
};

interface DeleteLinkButtonProps {
  linkId: number;
}

function DeleteLinkButton({ linkId }: DeleteLinkButtonProps) {
  const { deleteLinkMutation } = useLinks();

  return (
    <ConfirmActionDialog
      title="Delete link"
      body="The selected link will be permanently removed. This action cannot be undone."
      confirmLabel="Delete"
      isLoading={deleteLinkMutation.isLoading}
      onConfirm={(close) =>
        deleteLinkMutation.mutate(linkId, { onSettled: close })
      }
      trigger={(onOpen) => (
        <Tooltip label="Delete link" openDelay={500}>
          <IconButton
            size="xs"
            aria-label="Delete link"
            variant="delete"
            icon={<AiFillDelete />}
            onClick={onOpen}
            isDisabled={deleteLinkMutation.isLoading}
          />
        </Tooltip>
      )}
    />
  );
}

function LinkOptions({ link }: IProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { addToFavoritesMutation, removeFromFavoritesMutation } = useLinks();

  return (
    <EntityOptions
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      entityType="link"
      entityId={link.id}
      addToFavoritesMutation={addToFavoritesMutation}
      removeFromFavoritesMutation={removeFromFavoritesMutation}
      deleteButton={<DeleteLinkButton linkId={link.id} />}
      editForm={<EditLinkForm linkItem={link} onClose={onClose} />}
      isStarred={link.starred}
    />
  );
}

export default LinkOptions;
