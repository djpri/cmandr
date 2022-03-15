import { Button, FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useCommandCategories from "../../../hooks/useCommandCategories";
import useCommands from "../../../hooks/useCommands";
import { Command, CommandUpdateDto } from "../../../models/command";

type IProps = {
  commandItem: Command;
  onClose: () => void;
};

function EditCommandForm({ commandItem, onClose }: IProps) {
  const { description, line, reference } = commandItem;
  const { query: allCategoriesQuery } = useCommandCategories();
  const { editCommandMutation } = useCommands();

  const categories = allCategoriesQuery.data;

  const { handleSubmit, register } = useForm<CommandUpdateDto>({
    defaultValues: {
      description,
      line,
      reference,
      categoryId: commandItem.category.id,
    },
  });

  const onSubmit = (values: CommandUpdateDto) => {
    editCommandMutation.mutate({ id: commandItem.id, body: { ...values } });
    // alert(JSON.stringify(values, null, 2));
    // closes popover if using the form inside a popover
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mb="10" mt="3">
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          {...register("description")}
          placeholder="Description of what command does"
        />

        <FormLabel htmlFor="command">Command</FormLabel>
        <Input {...register("line")} placeholder="Command" />

        <FormLabel htmlFor="category">Category</FormLabel>
        <Select {...register("categoryId")}>
          <option value="">Select Category</option>
          {categories &&
            categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
        </Select>

        <FormLabel htmlFor="reference">Reference</FormLabel>
        <Input {...register("reference")} placeholder="Reference" />

        <Button type="submit" colorScheme="orange">
          Save
        </Button>
      </Stack>
    </form>
  );
}

export default EditCommandForm;
