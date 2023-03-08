import { CommandCategories, Commands } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useChakraToast from "hooks/other/useChakraToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";

function useCommandsFromSingleCategory(categoryId: number) {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useChakraToast();
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);

  const query = useQuery(
    ["commands", categoryId],
    asReactQueryFunction(() => Commands.getAllByCategoryId(categoryId)),
    {
      enabled: isAppInitalized,
    }
  );

  const addCategoryMutation = useMutation(CommandCategories.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['commands']);
      queryClient.invalidateQueries(["commands", categoryId]);
      showSuccessToast("Command Added", "Command added successfully");
    },
    onError: showErrorToast,
  });
  const editCategoryMutation = useMutation(CommandCategories.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(['commands']);
      queryClient.invalidateQueries(["commands", categoryId]);
      showSuccessToast("Command Edited", "Command edited successfully");
    },
    onError: showErrorToast,
  });
  const deleteCategoryMutation = useMutation(CommandCategories.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['commands']);
      queryClient.invalidateQueries(["commands", categoryId]);
      showSuccessToast("Command Deleted", "Command deleted successfully");
    },
    onError: showErrorToast,
  });

  return {
    query,
    addCategoryMutation,
    editCategoryMutation,
    deleteCategoryMutation,
  };
}

export default useCommandsFromSingleCategory;
