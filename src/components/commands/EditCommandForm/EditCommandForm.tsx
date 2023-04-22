import { Button, FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import useCategories from "hooks/categories/useCategories";
import { CategoryReadDto } from "models/category";
import { useForm } from "react-hook-form";
import useCommands from "../../../hooks/entities/useCommands";
import { CommandReadDto, CommandUpdateDto } from "../../../models/command";

type IProps = {
  commandItem: CommandReadDto;
  onClose: () => void;
};

function EditCommandForm({ commandItem, onClose }: IProps) {
  const { description, line, reference } = commandItem;
  const { query: allCategoriesQuery } = useCategories("command");
  const { editCommandMutation } = useCommands();

  const categories: CategoryReadDto[] = allCategoriesQuery.data;

  const { handleSubmit, register } = useForm<CommandUpdateDto>({
    defaultValues: {
      description,
      line,
      reference,
      categoryId: commandItem.category.id,
    },
  });

  const onSubmit = (values: CommandUpdateDto) => {
    // ensure that categoryId is a number before submitting
    values.categoryId = parseInt(values.categoryId.toString());

    editCommandMutation.mutate({ id: commandItem.id, body: { ...values } });
    // closes popover if using the form inside a popover
    if (onClose) onClose();
  };

  return (
    <form aria-label="edit command form" onSubmit={handleSubmit(onSubmit)}>
      <Stack mb="10" mt="3">
        <FormLabel htmlFor="description" m="0">
          Description
        </FormLabel>
        <Input
          {...register("description")}
          placeholder="Description of what command does"
        />

        <FormLabel htmlFor="command">Command</FormLabel>
        <Input {...register("line")} placeholder="Command" />

        <FormLabel htmlFor="category">Category</FormLabel>
        <Select {...register("categoryId")}>
          <option value={-1}>Select Category</option>
          {categories &&
            categories
              .filter((category) => category.isGroup === false)
              .map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
        </Select>

        <FormLabel htmlFor="reference">Reference</FormLabel>
        <Input {...register("reference")} placeholder="Reference" />

        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
}

export default EditCommandForm;
