import { CommandCategories } from "api/endpoints";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useChakraToast from "./useChakraToast";

function UseCommandCategories() {
  const queryClient = useQueryClient();

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const allCommandCategoriesQuery = useQuery(
    "commandCategories",
    CommandCategories.getAll
  );

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addCommandMutation = useMutation(CommandCategories.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Command Added", "Command added successfully");
    },
    onError: showErrorToast,
  });
  const editCommandMutation = useMutation(CommandCategories.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Command Edited", "Command edited successfully");
    },
    onError: showErrorToast,
  });
  const deleteCommandMutation = useMutation(CommandCategories.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("commandCategories");
      showSuccessToast("Command Deleted", "Command deleted successfully");
    },
    onError: showErrorToast,
  });

  return {
    allCommandCategories: allCommandCategoriesQuery.data,
    addCommandMutation,
    editCommandMutation,
    deleteCommandMutation,
  };
}

export default UseCommandCategories;
