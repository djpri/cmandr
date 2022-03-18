import { CommandCategories } from "api";
import { asReactQueryFunction } from "helpers/helpers";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useChakraToast from "../other/useChakraToast";

/**
 * Custom hook that contains react query logic for command categories
 *
 * @example
 *
 * ```js
 * const { query } = useCommandCategories();
 * const categories = query.data;
 * ```
 */
function useCommandCategories() {
  const queryClient = useQueryClient();

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const query = useQuery(
    "commandCategories",
    asReactQueryFunction(CommandCategories.getAll)
  );

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addCategoryMutation = useMutation(CommandCategories.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Command Added", "Command added successfully");
    },
    onError: showErrorToast,
  });
  const editCategoryMutation = useMutation(CommandCategories.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Command Edited", "Command edited successfully");
    },
    onError: showErrorToast,
  });
  const deleteCategoryMutation = useMutation(CommandCategories.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Command Deleted", "Command deleted successfully");
    },
    onError: showErrorToast,
  });

  return {
    query,
    addCategoryMutation,
    editCategoryMutation,
    deleteCategoryMutation,
  };
}

export default useCommandCategories;
