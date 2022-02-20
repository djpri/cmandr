import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setDeleteCommand } from "redux/commands/commandsSlice";
import { Commands } from "../../endpoints/commands";

export const useDeleteCommand = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const deleteCommandInDB = async (id: number) => {
    try {
      await Commands.remove(id);

      dispatch(setDeleteCommand(id));
      toast({
        title: "Command Changed",
        description: "command deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "something went wrong...",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return { deleteCommandInDB };
};
