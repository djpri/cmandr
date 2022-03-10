import { CommandCategories } from "api";
import { asReactQueryFunction } from "helpers/helpers";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CategoryReadDto } from "../models/category";
import useChakraToast from "./useChakraToast";

/**
 * Custom hook that contains react query logic for command categories
 *
 * @example
 *
 * ```js
 * const { allCommandCategoriesQuery } = useCommandCategories();
 * const commandCategoriesData = allCommandCategoriesQuery.data;
 * ```
 */
function useCommandCategories() {
  const queryClient = useQueryClient();

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const allCategoriesQuery = useQuery(
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
  /**
   * @example
   *
   * ```js
   * deleteCommandMutation.mutate(commandId);
   * ```
   */
  const deleteCategoryMutation = useMutation(CommandCategories.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Command Deleted", "Command deleted successfully");
    },
    onError: showErrorToast,
  });

  return {
    allCategoriesQuery,
    addCategoryMutation,
    editCategoryMutation,
    deleteCategoryMutation,
  };
}

export default useCommandCategories;
