import { Button, FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import useLinkCategories from "hooks/useLinkCategories";
import useLinks from "hooks/useLinks";
import { Link, LinkUpdateDto } from "models/link";
import React from "react";
import { useForm } from "react-hook-form";

type IProps = {
  linkItem: Link;
  onClose: () => void;
};

function EditLinkForm({ linkItem, onClose }: IProps) {
  const { id, title, url } = linkItem;
  const { query: allCategoriesQuery } = useLinkCategories();
  const { editLinkMutation } = useLinks();

  const { handleSubmit, register } = useForm<LinkUpdateDto>({
    defaultValues: {
      title,
      link: url,
      categoryId: linkItem.category.id,
    },
  });

  const onSubmit = (values: LinkUpdateDto) => {
    editLinkMutation.mutate({ id, body: values });
    // closes popover if using form from popover only
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mb="10" mt="3">
        <FormLabel htmlFor="description">Title</FormLabel>
        <Input {...register("title")} placeholder="Link Title" />

        <FormLabel htmlFor="Link">Url</FormLabel>
        <Input {...register("link")} placeholder="URL for link" />

        <FormLabel htmlFor="category">Category</FormLabel>
        <Select {...register("categoryId")}>
          <option value="">Select Category</option>
          {allCategoriesQuery.data &&
            allCategoriesQuery.data.map((category) => (
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
