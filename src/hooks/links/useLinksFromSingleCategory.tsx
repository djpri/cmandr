import { Links } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useChakraToast from "hooks/other/useChakraToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";

/**
 * Custom hook that contains react query logic for links.
 * Gets all links that match the category id.
 *
 * @example
 *
 * ```js
 * const { query } = useLinks(linkId);
 * const links = query.data;
 * ```
 */
function useLinksFromSingleCategory(linkId: number) {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useChakraToast();
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);

  const query = useQuery(
    ["links", linkId],
    asReactQueryFunction(() => Links.getAllByCategoryId(linkId)),
    { enabled: isAppInitalized }
  );

  const addLinkMutation = useMutation(Links.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
      queryClient.invalidateQueries(["links", linkId]);
      showSuccessToast("Link Added", "Link added successfully");
    },
    onError: showErrorToast,
  });
  const editLinkMutation = useMutation(Links.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
      queryClient.invalidateQueries(["links", linkId]);
      showSuccessToast("Link Edited", "Link edited successfully");
    },
    onError: showErrorToast,
  });
  const deleteLinkMutation = useMutation(Links.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
      queryClient.invalidateQueries(["links", linkId]);
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

export default useLinksFromSingleCategory;
