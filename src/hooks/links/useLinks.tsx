import { Links } from "api";
import { asReactQueryFunction } from "helpers/helpers";
import useChakraToast from "hooks/other/useChakraToast";
import { useMutation, useQuery, useQueryClient } from "react-query";

/**
 * Custom hook that contains react query logic for links
 *
 * @example
 *
 * ```js
 * const { query } = useLinks();
 * const links = query.data;
 * ```
 */
function useLinks() {
  const queryClient = useQueryClient();

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const query = useQuery("links", asReactQueryFunction(Links.getAll));
  // const singleCategoryQuery = useQuery(
  //   ["links", props.categoryId],
  //   asReactQueryFunction(() => Links.getAllByCategoryId(props.categoryId))
  // );

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addLinkMutation = useMutation(Links.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("links");
      queryClient.invalidateQueries("linkCategories");
      showSuccessToast("Link Added", "Link added successfully");
    },
    onError: showErrorToast,
  });
  const editLinkMutation = useMutation(Links.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("links");
      queryClient.invalidateQueries("linkCategories");
      showSuccessToast("Link Edited", "Link edited successfully");
    },
    onError: showErrorToast,
  });
  const deleteLinkMutation = useMutation(Links.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("links");
      queryClient.invalidateQueries("linkCategories");
      showSuccessToast("Link Deleted", "Link deleted successfully");
    },
    onError: showErrorToast,
  });

  return {
    query,
    addLinkMutation,
    editLinkMutation,
    deleteLinkMutation,
  };
}

export default useLinks;
