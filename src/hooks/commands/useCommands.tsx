import { Commands } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useChakraToast from "hooks/other/useChakraToast";
import { CategoryReadDto } from "models/category";
import { CommandReadDto } from "models/command";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const query = useQuery<CommandReadDto[]>(
    ['commands'],
    asReactQueryFunction(() => Commands.getAll()),
    {
      enabled: isAppInitalized,
    }
  );

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addCommandMutation = useMutation(Commands.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['commands']);
      // queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Command Added", "Command added successfully");
    },
    onMutate: async (newCommand): Promise<CategoryReadDto[]> => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['todos']);

      // Snapshot the previous value
      const previousCategories: CategoryReadDto[] =
        queryClient.getQueryData(['commandCategories']) || [];

      const newCategories: CategoryReadDto[] = previousCategories.map(
        (category) => {
          if (category.id === newCommand.categoryId) {
            return { ...category, items: category.items + 1 };
          } else {
            return category;
          }
        }
      );

      // Optimistically update to the new value
      queryClient.setQueryData(['commandCategories'], newCategories);

      // Return a context object with the snapshotted value
      return previousCategories;
    },

    onError: () => {
      queryClient.invalidateQueries(['commandCategories']);
      showErrorToast();
    },
  });
  const editCommandMutation = useMutation(Commands.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(['commands']);
      queryClient.invalidateQueries(['commandCategories']);
      showSuccessToast("Command Edited", "Command edited successfully");
    },
    onError: showErrorToast,
  });
  const deleteCommandMutation = useMutation(Commands.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['commands']);
      queryClient.invalidateQueries(['commandCategories']);
      showSuccessToast("Command Deleted", "Command deleted successfully");
    },
    onError: showErrorToast,
  });
  const editMultipleCommandsMutation = useMutation(Commands.bulkUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['commands']);
      queryClient.invalidateQueries(['commandCategories']);
    },
    onError: showErrorToast,
  });
  const deleteMultipleCommandsMutation = useMutation(Commands.bulkRemove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['commands']);
      queryClient.invalidateQueries(['commandCategories']);
      showSuccessToast("Commands Deleted", "Commands deleted successfully");
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
    editMultipleCommandsMutation,
    deleteMultipleCommandsMutation,
  };
}

export default useCommands;
