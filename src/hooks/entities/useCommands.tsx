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
  } = Commands;
  const queryKey = categoryId ? ["commands", categoryId] : ["commands"];
  const categoryQueryKey = ["commandCategories"];
  const queryFunction = categoryId
    ? asReactQueryFunction(() => getAllByCategoryId(categoryId))
    : asReactQueryFunction(getAll);

  const {
    query,
    useDefaultMutation,
    addMutation,
    editMutation,
    deleteMutation,
  } = useReactQueryEntity<CommandReadDto>({
    queryKey,
    categoryQueryKey,
    queryFunction,
    endpoints: {
      create,
      update,
      remove,
    }
  });

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const editMultipleCommandsMutation = useDefaultMutation(bulkUpdate);

  const deleteMultipleCommandsMutation = useDefaultMutation(bulkRemove);

  return {
    query,
    addCommandMutation: addMutation,
    editCommandMutation: editMutation,
    deleteCommandMutation: deleteMutation,
    editMultipleCommandsMutation,
    deleteMultipleCommandsMutation,
  };
}

export default useCommands;
