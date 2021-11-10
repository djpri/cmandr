import { Button, FormLabel, Input, Select, Grid, Box } from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCategoriesWithIds } from "../../redux/commands/commandsSlice";
import { useAddCommand } from "../../services/commands/addCommandToDB";
import { CommandCategory, Command } from "../../types/types";

function AddCommandForm() {
  const categories: CommandCategory[] = useSelector(selectCategoriesWithIds);
  const { handleSubmit, register, reset } = useForm();
  const { addCommandToDB } = useAddCommand();

  const onSubmit = (values: Command) => {
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
          <Select {...register("category")}>
            <option value="">Select Category</option>
            {categories &&
              categories.map((category, index) => (
                <option value={category.id} key={index}>
                  {category.name}
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
