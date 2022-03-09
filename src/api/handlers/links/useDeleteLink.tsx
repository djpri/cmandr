import { useToast } from "@chakra-ui/react";
import { Links } from "api/endpoints/links";
import { useDispatch } from "react-redux";
import { setDeleteLink } from "redux/links/linksSlice";

export const useDeleteLink = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const deleteLinkInDB = async (id: number) => {
    try {
      await Links.remove(id);
      dispatch(setDeleteLink(id));
      toast({
        title: "Link Deleted",
        description: "Link deleted successfully",
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

  return { deleteLinkInDB };
};
