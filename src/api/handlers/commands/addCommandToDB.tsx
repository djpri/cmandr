import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setAddCommand } from "../../../redux/commands/commandsSlice";
import { Command } from "../../../models/command";
import { Commands } from "../../endpoints/commands";

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
      const { data } = await Commands.create({
        line,
        description,
        reference,
        categoryId: category.id,
      });
      if (data !== null) {
        dispatch(setAddCommand(data));
        toast({
          title: "Command Added",
          description: "command added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
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
