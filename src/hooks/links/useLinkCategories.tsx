import { LinkCategories } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";
import useChakraToast from "../other/useChakraToast";

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
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const query = useQuery(['linkCategories'], asReactQueryFunction(LinkCategories.getAll), {
    enabled: isAppInitalized,
  });

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addCategoryMutation = useMutation(LinkCategories.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['linkCategories']);
    },
    onError: showErrorToast,
  });
  const editCategoryMutation = useMutation(LinkCategories.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(['linkCategories']);
    },
    onError: showErrorToast,
  });
  const deleteCategoryMutation = useMutation(LinkCategories.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['linkCategories']);
    },
    onError: showErrorToast,
  });
  const manualSortMutation = useMutation(LinkCategories.manualSort, {
    onSuccess: () => {
      queryClient.refetchQueries(['settings']);
      queryClient.invalidateQueries(['linkCategories']);
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

export default useLinkCategories;
