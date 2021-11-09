import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setEditCommand } from "../../redux/commands/commandsSlice";
import { Command } from "../../types/types";

export const useDeleteCommand = async (values: Command) => {
  const dispatch = useDispatch();
  const toast = useToast();

  try {
    dispatch(setEditCommand(values));
    toast({
      title: "Command Changed",
      description: "command changed successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);
  }
};
