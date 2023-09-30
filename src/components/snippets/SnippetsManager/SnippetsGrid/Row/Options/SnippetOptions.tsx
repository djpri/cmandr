import { HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import EntityOptions from "components/shared/EntityOptions";
import EditSnippetForm from "components/snippets/EditSnippetForm/EditSnippetForm";
import useSnippets from "hooks/entities/useSnippets";
import { SnippetReadDto } from "models/snippets";
import { AiFillDelete } from "react-icons/ai";
import { setCode, setLanguage } from "redux/slices/editorSlice";
import { useAppDispatch } from "redux/store";

type IProps = {
  snippet: SnippetReadDto;
  setReadOnlyCode: (code: string, language: string) => void;
};

function SnippetOptions({ snippet, setReadOnlyCode }: IProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { deleteSnippetMutation, addToFavoritesMutation, removeFromFavoritesMutation } = useSnippets();

  const dispatch = useAppDispatch();

  const viewCode = () => {
    setReadOnlyCode(snippet?.code, snippet?.language);
    dispatch(setCode(snippet?.code));
    dispatch(setLanguage(snippet?.language));
  };

  return (
    <HStack gap={2}>
      <EntityOptions
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        entityType="snippet"
        entityId={snippet.id}
        isStarred={snippet?.starred}
        addToFavoritesMutation={addToFavoritesMutation}
        removeFromFavoritesMutation={removeFromFavoritesMutation}
        deleteButton={
          <IconButton
            size="xs"
            aria-label="Delete link"
            variant="delete"
            icon={<AiFillDelete />}
            onClick={() => {
              deleteSnippetMutation.mutate(snippet?.id);
              onClose();
            }}
          >
            Delete
          </IconButton>
        }
        editForm={<EditSnippetForm snippetItem={snippet} onClose={onClose} />}
      />
    </HStack>
  );
}

export default SnippetOptions;
