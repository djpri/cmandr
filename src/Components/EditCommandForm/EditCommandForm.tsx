import * as React from "react";
import { Button, Stack, Input, FormLabel, Select } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  selectCategoriesWithIds,
  selectCategoriesAsKeyValuePairs,
} from "../../redux/commands/commandsSlice";
import { useEditCommand } from "../../services/commands/editCommandInDB";
import { Command, CommandCategory } from "../../types/types";

type IProps = {
  commandItem: Command;
  onClose: () => void;
};

function EditCommandForm({ commandItem, onClose }: IProps) {
  const { id, description, command, category, reference } = commandItem;
  const categories: CommandCategory[] = useSelector(selectCategoriesWithIds);
  const categoryList = useSelector(selectCategoriesAsKeyValuePairs);
  const { editCommandInDB } = useEditCommand();

  const { handleSubmit, register, setValue, getValues } = useForm<Command>({
    defaultValues: {
      id,
      description,
      command,
      category,
      reference,
    },
  });

  const onSubmit = (values: Command) => {
    setValue("category.name", categoryList[getValues("category.id")]);
    editCommandInDB(values);
    // closes popover if using form from popover only
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mb="10" mt="3">
        <Input {...register("id")} placeholder="id" isDisabled type="hidden" />

        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          {...register("description")}
          placeholder="How to (description of what command does)"
        />

        <FormLabel htmlFor="command">Command</FormLabel>
        <Input {...register("command")} placeholder="Command" />

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
