import { Snippets } from "api";

import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useChakraToast from "hooks/other/useChakraToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";

function useSnippetsFromSingleCategory(linkId: number) {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useChakraToast();
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);


  const query = useQuery(
    ["snippets", linkId],
    asReactQueryFunction(() => Snippets.getAllByCategoryId(linkId)),
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

export default useSnippetsFromSingleCategory;
