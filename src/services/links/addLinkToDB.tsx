import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUid } from "../../redux/auth/authSlice";
import { setAddLink } from "../../redux/links/linksSlice";
import { supabase } from "../../supabase/supabase";
import { Link } from "../../models/models";

export const useAddLink = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const uid: string = useSelector(selectUserUid);

  const addLinkToDB = async ({ link, category, title }: Link) => {
    const { data, error } = await supabase.from("links").insert([
      {
        link,
        title,
        user_id: uid,
        category_id: category.id,
      },
    ]);

    if (data !== null) {
      dispatch(setAddLink({ id: data[0].id, link, category, title }));
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
