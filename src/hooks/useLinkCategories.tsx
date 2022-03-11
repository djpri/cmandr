import { LinkCategories } from "api";
import { asReactQueryFunction } from "helpers/helpers";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useChakraToast from "./useChakraToast";

/**
 * Custom hook that contains react query logic for link categories
 *
 * @example
 *
 * ```js
 * const { query } = useLinkCategories();
 * const categories = query.data;
 * ```
 */
function useLinkCategories() {
  const queryClient = useQueryClient();

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const query = useQuery(
    "commandCategories",
    asReactQueryFunction(LinkCategories.getAll)
  );

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addCategoryMutation = useMutation(LinkCategories.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("linkCategories");
      showSuccessToast("Command Added", "Command added successfully");
    },
    onError: showErrorToast,
  });
  const editCategoryMutation = useMutation(LinkCategories.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("linkCategories");
      showSuccessToast("Command Edited", "Command edited successfully");
    },
    onError: showErrorToast,
  });
  const deleteCategoryMutation = useMutation(LinkCategories.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("linkCategories");
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

export default useLinkCategories;
