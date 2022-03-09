import { useToast } from "@chakra-ui/react";
import { Links } from "api/endpoints/links";
import { useDispatch } from "react-redux";
import { setAddLink } from "redux/links/linksSlice";
import { LinkCreateDto } from "../../models/link";

export const useAddLink = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const addLinkToDB = async ({ link, category, title }) => {
    const requestBody: LinkCreateDto = {
      link,
      title,
      categoryId: category.id,
    };
    try {
      const { data } = await Links.create(requestBody);
      dispatch(setAddLink(data));
      toast({
        title: "Link Added",
        description: "Link added successfully",
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

  return { addLinkToDB };
};
