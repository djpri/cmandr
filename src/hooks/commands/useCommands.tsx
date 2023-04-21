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
function useCommands(categoryId?: number) {
  const queryClient = useQueryClient();
  const isAppInitialized: boolean = useSelector(selectUserHasReceivedToken);
  const queryKey = categoryId ? ["commands", categoryId] : ["commands"];

  const { showErrorToast } = useChakraToast();

  // Queries
  const query = useQuery<CommandReadDto[]>(
    queryKey,
    asReactQueryFunction(() => Commands.getAll()),
    {
      enabled: isAppInitialized,
    }
  );

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addCommandMutation = useMutation(Commands.create, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      // queryClient.invalidateQueries("commandCategories");
    },
    onMutate: async (newCommand): Promise<CategoryReadDto[]> => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["commandCategories"]);

      // Snapshot the previous value
      const previousCategories: CategoryReadDto[] =
        queryClient.getQueryData(["commandCategories"]) || [];

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
      queryClient.setQueryData(["commandCategories"], newCategories);

      // Return a context object with the snapshotted value
      return previousCategories;
    },

    onError: async () => {
      await queryClient.invalidateQueries(["commandCategories"]);
      showErrorToast();
    },
  });
  const editCommandMutation = useMutation(Commands.update, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      await queryClient.invalidateQueries(["commandCategories"]);
    },
    onError: showErrorToast,
  });
  const deleteCommandMutation = useMutation(Commands.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      await queryClient.invalidateQueries(["commandCategories"]);
    },
    onError: showErrorToast,
  });
  const editMultipleCommandsMutation = useMutation(Commands.bulkUpdate, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      await queryClient.invalidateQueries(["commandCategories"]);
    },
    onError: showErrorToast,
  });
  const deleteMultipleCommandsMutation = useMutation(Commands.bulkRemove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      await queryClient.invalidateQueries(["commandCategories"]);
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
