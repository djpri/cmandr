import { CommandCategories } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";
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
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const query = useQuery(
    "commandCategories",
    asReactQueryFunction(CommandCategories.getAll),
    { enabled: isAppInitalized }
  );

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addCategoryMutation = useMutation(CommandCategories.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Category Added", "Category added successfully");
    },
    onError: showErrorToast,
  });
  const editCategoryMutation = useMutation(CommandCategories.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Category Edited", "Category edited successfully");
    },
    onError: showErrorToast,
  });
  const deleteCategoryMutation = useMutation(CommandCategories.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Category Deleted", "Category deleted successfully");
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
