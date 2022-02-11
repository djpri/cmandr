import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setDeleteCommand } from "../../redux/commands/commandsSlice";
import { supabase } from "../../supabase/supabase";

export const useDeleteCommand = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const deleteCommandInDB = async (id: number) => {
    const { error } = await supabase
      .from("commands")
      .delete()
      .match({ id: id });

    if (error === null) {
      dispatch(setDeleteCommand(id));
      toast({
        title: "Command Changed",
        description: "command changed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
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
