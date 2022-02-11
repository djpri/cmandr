import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUid } from "../../redux/auth/authSlice";
import { setAddCommand } from "../../redux/commands/commandsSlice";
import { supabase } from "../../supabase/supabase";
import { Command } from "../../models/models";

export const useAddCommand = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const uid: string = useSelector(selectUserUid);

  const addCommandToDB = async ({
    description,
    command,
    category,
    reference,
  }: Command) => {
    const { data, error } = await supabase.from("commands").insert([
      {
        description,
        command,
        reference,
        user_id: uid,
        category_id: category.id,
      },
    ]);

    if (data !== null) {
      dispatch(
        setAddCommand({
          id: data[0].id,
          description,
          command,
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

    if (error) {
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
