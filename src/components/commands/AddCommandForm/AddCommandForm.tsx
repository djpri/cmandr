import { Box, Button, FormLabel, Grid, Input, Select } from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useCommandCategories from "../../../hooks/useCommandCategories";
import useCommands from "../../../hooks/useCommands";
import { CommandCreateDto } from "../../../models/command";

interface IProps {
  categoryId?: number;
}

function AddCommandForm({ categoryId }: IProps) {
  const [showCategorySelect, setShowCategorySelect] = useState(true);
  const { handleSubmit, register, reset, setValue } =
    useForm<CommandCreateDto>();
  const { addCommandMutation } = useCommands();
  const { query: allCategoriesQuery } = useCommandCategories();

  useEffect(() => {
    if (categoryId) {
      setShowCategorySelect(false);
      setValue("categoryId", categoryId);
    } else {
      setShowCategorySelect(true);
    }
  }, [categoryId, setValue]);

  const onSubmit = (values: CommandCreateDto) => {
    addCommandMutation.mutate(values);
    // alert(JSON.stringify(values, null, 2));
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
            <FormLabel htmlFor="categoryId">Category</FormLabel>
            <Select {...register("categoryId")}>
              <option value="">Select Category</option>
              {allCategoriesQuery.data &&
                allCategoriesQuery.data.map((category, index) => (
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
