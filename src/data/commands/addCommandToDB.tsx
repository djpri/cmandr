import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setAddCommand } from "../../redux/commands/commandsSlice";
import { Command } from "../../models/command";
import { CmandrApi } from "../apiAxiosInstance";

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
      const { data } = await CmandrApi.post("commands", {
        line,
        description,
        reference,
        categoryId: category.id,
      });
      if (data !== null) {
        dispatch(
          setAddCommand({
            id: data[0].id,
            description,
            line,
            reference,
            category,
          })
        );
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
