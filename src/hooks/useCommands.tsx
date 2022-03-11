import { Commands } from "api";
import { asReactQueryFunction } from "helpers/helpers";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useChakraToast from "./useChakraToast";

/**
 * Custom hook that contains react query logic for commands
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

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const query = useQuery("commands", asReactQueryFunction(Commands.getAll));

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addCommandMutation = useMutation(Commands.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("commands");
      showSuccessToast("Command Added", "Command added successfully");
    },
    onError: showErrorToast,
  });
  const editCommandMutation = useMutation(Commands.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("commands");
      showSuccessToast("Command Edited", "Command edited successfully");
    },
    onError: showErrorToast,
  });
  const deleteCommandMutation = useMutation(Commands.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("commands");
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
