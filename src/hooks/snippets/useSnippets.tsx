import { Snippets } from "api";

import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useChakraToast from "hooks/other/useChakraToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";

/**
 * Custom hook that contains react query logic for snippets.
 *
 * @example
 *
 * ```js
 * const { query } = useSnippets();
 * const snippets = query.data;
 * ```
 */
function useSnippets() {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useChakraToast();
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);

  const query = useQuery(
    ["snippets"],
    asReactQueryFunction(() => Snippets.getAll()),
    { enabled: isAppInitalized }
  );

  const addSnippetMutation = useMutation(Snippets.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["snippets"]);
      showSuccessToast("Snippet Added", "Snippet added successfully");
    },
    onError: showErrorToast,
  });
  const editSnippetMutation = useMutation(Snippets.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(["snippets"]);
      showSuccessToast("Snippet Edited", "Snippet edited successfully");
    },
    onError: showErrorToast,
  });
  const deleteSnippetMutation = useMutation(Snippets.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(["snippets"]);
      showSuccessToast("Snippet Deleted", "Snippet deleted successfully");
    },
    onError: showErrorToast,
  });

  return {
    query,
    addSnippetMutation,
    editSnippetMutation,
    deleteSnippetMutation,
  };
}

export default useSnippets;