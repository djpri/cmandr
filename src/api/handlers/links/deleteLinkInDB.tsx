import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setDeleteLink } from "../../../redux/links/linksSlice";
import { supabase } from "../../../supabase/supabase";

export const useDeleteLink = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const deleteLinkInDB = async (id: number) => {
    const { error } = await supabase.from("links").delete().match({ id: id });

    if (error === null) {
      dispatch(setDeleteLink(id));
      toast({
        title: "Link Deleted",
        description: "Link deleted successfully",
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

  return { deleteLinkInDB };
};
