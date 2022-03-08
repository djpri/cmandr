import { useToast } from "@chakra-ui/react";
import { Links } from "api/endpoints/links";
import { useDispatch } from "react-redux";
import { setEditLink } from "redux/links/linksSlice";
import { Link } from "../../models/link";

export const useEditLink = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const editLinkInDB = async (values: Link) => {
    const { id, title, link, category } = values;

    const requestBody = {
      title,
      link,
      category: category.id,
    };

    try {
      const { data } = await Links.update(values.id, requestBody);
      dispatch(setEditLink(data));
      toast({
        title: "Link Changed",
        description: "Link changed successfully",
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

  return { editLinkInDB };
};
