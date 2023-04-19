import { Button, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import EntityOptions from "components/shared/EntityOptions";
import EditSnippetForm from "components/snippets/EditSnippetForm";
import useSnippets from "hooks/snippets/useSnippets";
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
  const { deleteSnippetMutation } = useSnippets();

  const dispatch = useAppDispatch();

  const viewCode = () => {
    setReadOnlyCode(snippet?.code, snippet?.language);
    dispatch(setCode(snippet?.code));
    dispatch(setLanguage(snippet?.language));
  };

  return (
    <HStack gap={2}>
      <Button size="xs" onClick={viewCode}>
        View code
      </Button>

      <EntityOptions
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        entityType="snippet"
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
