import { useMutation } from "@tanstack/react-query";
import { Snippets } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useReactQueryEntity from "hooks/entities/useReactQueryEntity";
import { SnippetReadDto } from "models/snippets";

function useSnippets(categoryId?: number) {
  const {
    getAll,
    create,
    update,
    bulkRemove,
    bulkUpdate,
    remove,
    getAllByCategoryId,
    addToFavorites,
    removeFromFavorites
  } = Snippets;
  const queryKey = categoryId ? ["snippets", categoryId] : ["snippets"];
  const categoryQueryKey = ["snippetCategories"];
  const queryFunction = categoryId
    ? asReactQueryFunction(() => getAllByCategoryId(categoryId))
    : asReactQueryFunction(getAll);

  const { query, defaultMutationSettings, addMutation, deleteMutation, addToFavoritesMutation, removeFromFavoritesMutation } =
    useReactQueryEntity<SnippetReadDto>({
      queryKey,
      categoryQueryKey,
      queryFunction,
      endpoints: {
        create,
        update,
        remove,
        addToFavorites,
        removeFromFavorites,
      },
    });

  const editSnippetMutation = useMutation(update, defaultMutationSettings);

  const editMultipleSnippetsMutation = useMutation(
    bulkUpdate,
    defaultMutationSettings
  );

  const deleteMultipleSnippetsMutation = useMutation(
    bulkRemove,
    defaultMutationSettings
  );

  return {
    query,
    addSnippetMutation: addMutation,
    editSnippetMutation,
    editMultipleSnippetsMutation,
    deleteSnippetMutation: deleteMutation,
    deleteMultipleSnippetsMutation,
    addToFavoritesMutation,
    removeFromFavoritesMutation
  };
}

export default useSnippets;
