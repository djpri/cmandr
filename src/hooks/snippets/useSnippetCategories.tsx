import { LinkCategories } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";
import useChakraToast from "../other/useChakraToast";
import { CategoryReadDto } from "models/category";

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
function useSnippetCategories() {
  const queryClient = useQueryClient();
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);

  const { showErrorToast } = useChakraToast();

  // Queries
  const query = useQuery(
    ["snippetCategories"],
    asReactQueryFunction(LinkCategories.getAll),
    {
      enabled: isAppInitalized,
    }
  );

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addCategoryMutation = useMutation(LinkCategories.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["snippetCategories"]);
    },
    onError: showErrorToast,
  });
  const editCategoryMutation = useMutation(LinkCategories.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(["snippetCategories"]);
    },
    onError: showErrorToast,
  });
  const deleteCategoryMutation = useMutation(LinkCategories.remove, {
    onMutate: (id) => {
      queryClient.cancelQueries(["snippetCategories"]);
      const previousCategories = queryClient.getQueryData(["snippetCategories"]);
      queryClient.setQueryData(["snippetCategories"], (old: CategoryReadDto[]) => {
        return old.filter((category: CategoryReadDto) => category.id !== id);
      });
      return () =>
        queryClient.setQueryData(["snippetCategories"], previousCategories);
    },
    onError: () => {
      queryClient.invalidateQueries(["snippetCategories"]);
      showErrorToast();
    },
  });
  const manualSortMutation = useMutation(LinkCategories.manualSort, {
    onSuccess: () => {
      queryClient.refetchQueries(["settings"]);
      queryClient.invalidateQueries(["snippetCategories"]);
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

export default useSnippetCategories;
