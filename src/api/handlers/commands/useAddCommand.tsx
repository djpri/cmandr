import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setAddCommand } from "redux/commands/commandsSlice";
import { Commands } from "../../endpoints/commands";
import { Command } from "../../models/command";

export const useAddCommand = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const addCommandToDB = async ({
    description,
    line,
    category,
    reference,
  }: Command) => {
    try {
      const requestBody = {
        line,
        description,
        reference,
        categoryId: category.id,
      };

      const { data } = await Commands.create(requestBody);

      dispatch(setAddCommand(data));
      toast({
        title: "Command Added",
        description: "command added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return { addCommandToDB };
};
