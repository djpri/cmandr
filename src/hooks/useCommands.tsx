import { Commands } from "api";
import { asReactQueryFunction } from "helpers/helpers";
import { CommandReadDto } from "models/command";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import useChakraToast from "./useChakraToast";

/**
 * Custom hook that contains react query logic for commands
 *
 * @example
 *
 * ```js
 * const { allCommandsQuery } = useCommands();
 * const commandsData = allCommandsQuery.data;
 * ```
 */
function useCommands(props) {
  const queryClient = useQueryClient();

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const allCommandsQuery = useQuery(
    "commands",
    asReactQueryFunction(Commands.getAll)
  );
  const singleCategoryQuery = useQuery(
    ["commands", props.categoryId],
    asReactQueryFunction(() => Commands.getAllByCategoryId(props.categoryId))
  );

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
    allCommands: allCommandsQuery.data,
    singleCategoryCommands: singleCategoryQuery.data,
    addCommandMutation,
    editCommandMutation,
    deleteCommandMutation,
  };
}

export default useCommands;
