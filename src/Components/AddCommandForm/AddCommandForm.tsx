import { Button, FormLabel, Input, Select, Grid, Box } from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  selectCategoriesAsKeyValuePairs,
  selectCategoriesWithIds,
} from "../../redux/commands/commandsSlice";
import { useAddCommand } from "../../services/commands/addCommandToDB";
import { Command, CommandCategory } from "../../types/types";

function AddCommandForm() {
  const categories: CommandCategory[] = useSelector(selectCategoriesWithIds);
  const categoryList = useSelector(selectCategoriesAsKeyValuePairs);

  const { handleSubmit, register, reset, setValue, getValues } =
    useForm<Command>();
  const { addCommandToDB } = useAddCommand();

  const onSubmit = (values) => {
    setValue("category.name", categoryList[getValues("category.id")]);
    alert(JSON.stringify(values));
    addCommandToDB(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid
        mb="10"
        templateColumns={[
          "repeat(1, 1fr)",
          null,
          "repeat(2, 1fr)",
          null,
          "repeat(4, 1fr)",
        ]}
        gap={6}
      >
        <Box>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            {...register("description")}
            placeholder="How to (description of what command does)"
          />
        </Box>

        <Box>
          <FormLabel htmlFor="command">Command</FormLabel>
          <Input {...register("command")} placeholder="Command" />
        </Box>

        <Box>
          <FormLabel htmlFor="category">Category</FormLabel>

          <Select {...register("category.id")}>
            <option value="">Select Category</option>
            {categories &&
              categories.map((category, index) => (
                <option value={category.id} key={index}>
                  {category.id} {category.name}
                </option>
              ))}
          </Select>
        </Box>

        <Box>
          <FormLabel htmlFor="reference">Reference</FormLabel>
          <Input
            {...register("reference")}
            placeholder="Reference"
            type="url"
          />
        </Box>

        <Button type="submit" colorScheme="green" size="sm" isFullWidth={false}>
          Add command
        </Button>
      </Grid>
    </form>
  );
}

export default AddCommandForm;
