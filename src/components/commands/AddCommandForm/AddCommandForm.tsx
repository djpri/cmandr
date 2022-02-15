import { Button, FormLabel, Input, Select, Grid, Box } from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectCategoriesAsKeyValuePairs,
  selectCategoriesWithIds,
} from "../../../redux/commands/commandsSlice";
import { useAddCommand } from "../../../api/handlers/commands/addCommandToDB";
import { CommandCategory } from "../../../models/category";
import { Command } from "../../../models/command";

function AddCommandForm() {
  const categories: CommandCategory[] = useSelector(selectCategoriesWithIds);
  const categoryList = useSelector(selectCategoriesAsKeyValuePairs);
  const params: { id: string } = useParams();
  const [showCategorySelect, setShowCategorySelect] = useState(true);
  const { handleSubmit, register, reset, setValue, getValues } =
    useForm<Command>();
  const { addCommandToDB } = useAddCommand();

  useEffect(() => {
    if (params && params.id) {
      setShowCategorySelect(false);
      setValue("category.id", parseInt(params.id));
    } else {
      setShowCategorySelect(true);
    }
  }, [params, setValue]);

  const onSubmit = (values: Command) => {
    setValue("category.name", categoryList[getValues("category.id")]);
    addCommandToDB(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid
        pb="5"
        templateColumns={[
          "repeat(1, 1fr)",
          null,
          "repeat(2, 1fr)",
          null,
          "repeat(4, 1fr)",
        ]}
        gap={6}
        alignItems="end"
      >
        <Box>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            {...register("description")}
            placeholder="Description of what command does"
          />
        </Box>

        <Box>
          <FormLabel htmlFor="line">Command</FormLabel>
          <Input {...register("line")} placeholder="Command" />
        </Box>

        {showCategorySelect && (
          <Box>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Select {...register("category.id")}>
              <option value="">Select Category</option>
              {categories &&
                categories.map((category, index) => (
                  <option value={category.id} key={index}>
                    {category.name}
                  </option>
                ))}
            </Select>
          </Box>
        )}

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
