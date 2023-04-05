import { Button, FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import useSnippetCategories from "hooks/snippets/useSnippetCategories";
import useSnippets from "hooks/snippets/useSnippets";
import { SnippetReadDto, SnippetUpdateDto } from "models/snippets";
import { useForm } from "react-hook-form";

type IProps = {
  snippetItem: SnippetReadDto;
  onClose: () => void;
};

function EditSnippetForm({ snippetItem, onClose }: IProps) {
  const { id, title, description, language } = snippetItem;
  const { query: allCategoriesQuery } = useSnippetCategories();
  const { editSnippetMutation } = useSnippets();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SnippetUpdateDto>({
    defaultValues: {
      title,
      description,
      language,
      categoryId: snippetItem.category.id,
    },
  });

  const onSubmit = (values) => {
    editSnippetMutation.mutate({ id, body: values });
    reset({ title: "", description: "", language: "", categoryId: -1 });
    // closes popover if using form from popover only
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mb="10" mt="3">
        <FormLabel htmlFor="description" m="0">
          Title
        </FormLabel>
        <Input {...register("title")} placeholder="Link Title" />

        <FormLabel htmlFor="Link">Language</FormLabel>
        <Input
          {...register("language")}
          placeholder="code snippet language"
        />

        <FormLabel htmlFor="category">Category</FormLabel>
        <Select {...register("categoryId")}>
          <option value="">Select Category</option>
          {allCategoriesQuery.data &&
            allCategoriesQuery.data
              .filter((category) => category.isGroup === false)
              .map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
        </Select>

        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
}

export default EditSnippetForm;
