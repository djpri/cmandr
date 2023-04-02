import {
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import EditLinkForm from "components/links/EditLinkForm/EditLinkForm";
import EntityOptions from "components/shared/EntityOptions";
import useLinks from "hooks/links/useLinks";
import { LinkReadDto } from "models/link";
import { AiFillDelete } from "react-icons/ai";

type IProps = {
  link: LinkReadDto;
};

interface DeleteLinkButtonProps {
  linkId: number;
  onClose: () => void;
}

function DeleteLinkButton({ linkId, onClose }: DeleteLinkButtonProps) {
  const { deleteLinkMutation } = useLinks();

  return (
    <IconButton
      size="xs"
      aria-label="Delete link"
      variant="delete"
      icon={<AiFillDelete />}
      onClick={() => {
        deleteLinkMutation.mutate(linkId);
        onClose();
      }}
    >
      Delete
    </IconButton>
  );
}

function LinkOptions({ link }: IProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <EntityOptions
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      entityType="link"
      deleteButton={<DeleteLinkButton linkId={link.id} onClose={onClose} />}
      editForm={<EditLinkForm linkItem={link} onClose={onClose} />}
    />
  );
}

export default LinkOptions;
