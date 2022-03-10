import { Commands } from "api/endpoints";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useChakraToast from "./useChakraToast";

function UseCommandsData(props) {
  const queryClient = useQueryClient();

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const allCommandsQuery = useQuery("commands", Commands.getAll);
  const singleCategoryQuery = useQuery(["commands", props.categoryId], () =>
    Commands.getAllByCategoryId(props.categoryId)
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

export default UseCommandsData;
