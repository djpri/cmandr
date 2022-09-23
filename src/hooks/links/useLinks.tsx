import { Links } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useChakraToast from "hooks/other/useChakraToast";
import { LinkReadDto } from "models/link";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";

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
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const query = useQuery<LinkReadDto[]>(
    "links",
    asReactQueryFunction(Links.getAll),
    {
      enabled: isAppInitalized,
    }
  );

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
  const quickAddLinkMutation = useMutation(Links.quickAdd, {
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
  const deleteMultipleLinksMutation = useMutation(Links.bulkRemove, {
    onSuccess: () => {
      queryClient.invalidateQueries("links");
      queryClient.invalidateQueries("linkCategories");
      showSuccessToast("Links Deleted", "Links deleted successfully");
    },
    onError: showErrorToast,
  });

  return {
    query,
    addLinkMutation,
    quickAddLinkMutation,
    editLinkMutation,
    deleteLinkMutation,
    deleteMultipleLinksMutation,
  };
}

export default useLinks;
