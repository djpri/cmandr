import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUid } from "../../redux/auth/authSlice";
import { supabase } from "../../supabase/supabase";
import { Link } from "../../types/types";

export const useAddLink = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const uid: string = useSelector(selectUserUid);

  const addLinkToDB = async ({ link, category }: Link) => {
    const { data, error } = await supabase.from("links").insert([
      {
        link,
        user_id: uid,
        category_id: category.id,
      },
    ]);

    if (data !== null) {
      console.log(data);
      toast({
        title: "Link Added",
        description: "Link added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    if (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return { addLinkToDB };
};
