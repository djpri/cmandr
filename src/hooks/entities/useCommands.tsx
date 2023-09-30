import { useMutation } from "@tanstack/react-query";
import { Commands } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useReactQueryEntity from "hooks/entities/useReactQueryEntity";
import { CommandReadDto } from "models/command";

function useCommands(categoryId?: number) {
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
  } = Commands;
  const queryKey = categoryId ? ["commands", categoryId] : ["commands"];
  const categoryQueryKey = ["commandCategories"];
  const queryFunction = categoryId
    ? asReactQueryFunction(() => getAllByCategoryId(categoryId))
    : asReactQueryFunction(getAll);

  const {
    query,
    defaultMutationSettings,
    addMutation,
    editMutation,
    deleteMutation,
    addToFavoritesMutation,
    removeFromFavoritesMutation
  } = useReactQueryEntity<CommandReadDto>({
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

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const editMultipleCommandsMutation = useMutation(
    bulkUpdate,
    defaultMutationSettings
  );

  const deleteMultipleCommandsMutation = useMutation(
    bulkRemove,
    defaultMutationSettings
  );

  return {
    query,
    addCommandMutation: addMutation,
    editCommandMutation: editMutation,
    deleteCommandMutation: deleteMutation,
    editMultipleCommandsMutation,
    deleteMultipleCommandsMutation,
    addToFavoritesMutation,
    removeFromFavoritesMutation
  };
}

export default useCommands;
