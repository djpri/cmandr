import { Snippets } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useReactQueryEntity from "hooks/entities/useReactQueryEntity";
import { SnippetReadDto } from "models/snippets";

function useSnippets(categoryId?: number) {
  const { getAll, create, update, bulkRemove, bulkUpdate, remove } = Snippets;
  const queryKey = categoryId ? ["snippets", categoryId] : ["snippets"];
  const categoryQueryKey = ["snippetCategories"];
  const queryFunction = asReactQueryFunction(getAll);

  const { query, useDefaultMutation, addMutation, deleteMutation } =
    useReactQueryEntity<SnippetReadDto>({
      queryKey,
      categoryQueryKey,
      queryFunction,
      endpoints: {
        create,
        update,
        remove,
      },
    });

  const editSnippetMutation = useDefaultMutation(update);

  const editMultipleSnippetsMutation = useDefaultMutation(bulkUpdate);

  const deleteMultipleSnippetsMutation = useDefaultMutation(bulkRemove);

  return {
    query,
    addSnippetMutation: addMutation,
    editSnippetMutation,
    editMultipleSnippetsMutation,
    deleteSnippetMutation: deleteMutation,
    deleteMultipleSnippetsMutation,
  };
}

export default useSnippets;
