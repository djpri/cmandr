import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setEditCommand } from "../../redux/commands/commandsSlice";
import { Command } from "../../models/models";
import { CmandrApi } from "../api";

export const useEditCommand = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const editCommandInDB = async (values: Command) => {
    try {
      await CmandrApi.put("commands");
      dispatch(setEditCommand(values));
      toast({
        title: "Command Changed",
        description: "command changed successfully",
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

  return { editCommandInDB };
};
