import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setEditLink } from "../../redux/links/linksSlice";
import { supabase } from "../../supabase/supabase";
import { Link } from "../../models/link";

export const useEditLink = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const editLinkInDB = async (values: Link) => {
    const { id, title, link, category } = values;

    const { error } = await supabase
      .from("links")
      .update({
        link,
        title,
        category_id: category.id,
      })
      .match({ id: id });

    if (error === null) {
      dispatch(setEditLink(values));
      toast({
        title: "Link Changed",
        description: "Link changed successfully",
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

  return { editLinkInDB };
};
