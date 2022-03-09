import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setEditCommand } from "redux/commands/commandsSlice";
import { Commands } from "../../endpoints/commands";
import { Command, CommandUpdateDto } from "../../models/command";

export const useEditCommand = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const editCommandInDB = async (values: Command) => {
    const requestBody: CommandUpdateDto = {
      description: values.description,
      line: values.line,
      reference: values.reference,
      categoryId: values.category.id,
    };

    try {
      const { data } = await Commands.update(values.id, requestBody);
      dispatch(setEditCommand(data));
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
