import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setEditCommand } from "../../redux/commands/commandsSlice";
import { supabase } from "../../supabase/supabase";
import { Command } from "../../types/types";

export const useEditCommand = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const editCommandInDB = async (values: Command) => {
    const { id, description, command, category, reference } = values;

    const { error } = await supabase
      .from("commands")
      .update({
        description,
        command,
        category,
        reference,
      })
      .match({ id: id });

    if (error === null) {
      dispatch(setEditCommand(values));
      toast({
        title: "Command Changed",
        description: "command changed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.log(error);
    }
  };

  return { editCommandInDB };
};
