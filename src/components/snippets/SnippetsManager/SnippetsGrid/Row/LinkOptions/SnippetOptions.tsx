import { Button, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import EntityOptions from "components/shared/EntityOptions";
import EditSnippetForm from "components/snippets/EditSnippetForm";
import useSnippets from "hooks/snippets/useSnippets";
import { SnippetReadDto } from "models/snippets";
import { AiFillDelete } from "react-icons/ai";

type IProps = {
  snippet: SnippetReadDto;
};

interface DeleteSnippetButtonProps {
  snippetId: number;
  onClose: () => void;
}

function DeleteSnippetButton({ snippetId, onClose }: DeleteSnippetButtonProps) {
  const { deleteSnippetMutation } = useSnippets();

  return (
    <IconButton
      size="xs"
      aria-label="Delete link"
      variant="delete"
      icon={<AiFillDelete />}
      onClick={() => {
        deleteSnippetMutation.mutate(snippetId);
        onClose();
      }}
    >
      Delete
    </IconButton>
  );
}

function SnippetOptions({ snippet: snippet }: IProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <HStack gap={2}>
          <Button size="xs">View code</Button>
      
      <EntityOptions
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        entityType="link"
        deleteButton={
          <DeleteSnippetButton snippetId={snippet.id} onClose={onClose} />
        }
        editForm={<EditSnippetForm snippetItem={snippet} onClose={onClose} />}
      />
    </HStack>
  );
}

export default SnippetOptions;
