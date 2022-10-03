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

  const { showErrorToast } = useChakraToast();

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
    },
    onError: showErrorToast,
  });
  const editCategoryMutation = useMutation(CommandCategories.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
    },
    onError: showErrorToast,
  });
  const deleteCategoryMutation = useMutation(CommandCategories.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
    },
    onError: showErrorToast,
  });
  const manualSortMutation = useMutation(CommandCategories.manualSort, {
    onSuccess: () => {
      queryClient.refetchQueries("settings");
      queryClient.invalidateQueries("commandCategories");
    },
    onError: showErrorToast,
  });

  return {
    query,
    addCategoryMutation,
    editCategoryMutation,
    deleteCategoryMutation,
    manualSortMutation,
  };
}

export default useCommandCategories;
