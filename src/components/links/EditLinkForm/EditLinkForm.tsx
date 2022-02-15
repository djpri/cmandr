import { Stack, Input, FormLabel, Select, Button } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  selectLinkCategories,
  selectLinksCategoriesAsObject,
} from "../../../redux/links/linksSlice";
import { useEditLink } from "../../../api/handlers/links/editLinkInDB";
import { LinkCategory } from "../../../models/category";
import { Link, LinkUpdateDto } from "../../../models/link";

type IProps = {
  linkItem: Link;
  onClose: () => void;
};

function EditLinkForm({ linkItem, onClose }: IProps) {
  const { id, title, link, category } = linkItem;
  const categories: LinkCategory[] = useSelector(selectLinkCategories);
  const categoryList = useSelector(selectLinksCategoriesAsObject);
  const { editLinkInDB } = useEditLink();

  const { handleSubmit, register, setValue, getValues } =
    useForm<LinkUpdateDto>({
      defaultValues: {
        id,
        title,
        link,
        category,
      },
    });

  const onSubmit = (values: LinkUpdateDto) => {
    setValue("category.name", categoryList[getValues("category.id")]);
    editLinkInDB(values);
    // closes popover if using form from popover only
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mb="10" mt="3">
        <Input {...register("id")} placeholder="id" isDisabled type="hidden" />

        <FormLabel htmlFor="description">Title</FormLabel>
        <Input {...register("title")} placeholder="Link Title" />

        <FormLabel htmlFor="Link">Url</FormLabel>
        <Input {...register("link")} placeholder="URL for link" />

        <FormLabel htmlFor="category">Category</FormLabel>
        <Select {...register("category.id")}>
          <option value="">Select Category</option>
          {categories &&
            categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
        </Select>

        <Button type="submit" colorScheme="orange">
          Save
        </Button>
      </Stack>
    </form>
  );
}

export default EditLinkForm;
