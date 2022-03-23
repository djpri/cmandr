import { Commands } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useChakraToast from "hooks/other/useChakraToast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";

/**
 * Custom hook that contains react query logic for commands
 *
 * @see https://react-query.tanstack.com/guides/queries
 *
 * @example
 *
 * ```js
 * const { query } = useCommands();
 * const commandsData = query.data;
 * ```
 */
function useCommands() {
  const queryClient = useQueryClient();
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const query = useQuery("commands", asReactQueryFunction(Commands.getAll), {
    enabled: isAppInitalized,
  });

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addCommandMutation = useMutation(Commands.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("commands");
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Command Added", "Command added successfully");
    },
    onError: showErrorToast,
  });
  const editCommandMutation = useMutation(Commands.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("commands");
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Command Edited", "Command edited successfully");
    },
    onError: showErrorToast,
  });
  const deleteCommandMutation = useMutation(Commands.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("commands");
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Command Deleted", "Command deleted successfully");
    },
    onError: showErrorToast,
  });

  return {
    query,
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    addCommandMutation,
    editCommandMutation,
    deleteCommandMutation,
  };
}

export default useCommands;
