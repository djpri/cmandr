import { Box, Button, FormLabel, Grid, Input, Select } from "@chakra-ui/react";
import useCategories from "hooks/categories/useCategories";
import useCommands from "hooks/entities/useCommands";
import { CommandCreateDto } from "models/command";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ValidationError, registerOptions } from "../commandFormUtils";

interface IProps {
  categoryId?: number;
}

function AddCommandForm({ categoryId }: IProps) {
  const [showCategorySelect, setShowCategorySelect] = useState(true);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CommandCreateDto>();
  const { addCommandMutation } = useCommands();
  const { query: allCategoriesQuery } = useCategories("command");

  useEffect(() => {
    if (categoryId) {
      setShowCategorySelect(false);
      setValue("categoryId", categoryId);
    } else {
      setShowCategorySelect(true);
    }
  }, [categoryId, setValue]);

  const onSubmit = (values: CommandCreateDto) => {
    values.categoryId = parseInt(values.categoryId.toString());
    addCommandMutation.mutate(values);
    reset({
      description: "",
      line: "",
      reference: "",
      categoryId: categoryId || -1,
    });
  };

  return (
    <>
      <form
        aria-label="add command form"
        data-cy="add-command-form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Grid
          pb="5"
          templateColumns={[
            "repeat(1, 1fr)",
            null,
            "repeat(2, 1fr)",
            null,
            "repeat(4, 1fr)",
          ]}
          gap={[2, 2, 3, 4]}
          alignItems="end"
        >
          <Box>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              data-cy="add-command-form-description"
              {...register("description", registerOptions.description)}
              placeholder="* Description of what command does"
            />
          </Box>

          <Box>
            <FormLabel htmlFor="line">Command</FormLabel>
            <Input
              id="line"
              {...register("line", registerOptions.line)}
              placeholder="* Command"
              data-cy="add-command-form-line"
            />
          </Box>

          {showCategorySelect && (
            <Box>
              <FormLabel htmlFor="categoryId">Category</FormLabel>
              <Select
                {...register("categoryId", registerOptions.category)}
                data-cy="add-command-form-category"
              >
                <option value={-1}>Select Category</option>
                {allCategoriesQuery.data &&
                  allCategoriesQuery.data
                    .filter((cat) => !cat.isGroup)
                    .map((category, index) => (
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
              {...register("reference", registerOptions.reference)}
              placeholder="Reference"
              data-cy="add-command-form-reference"
            />
          </Box>

          <Button
            type="submit"
            variant="add"
            size="sm"
            isLoading={addCommandMutation.isLoading}
            data-cy="add-command-form-submit"
            disabled={Object.keys(errors)?.length > 0}
          >
            Add command
          </Button>
        </Grid>
      </form>
      {Object.keys(errors)?.map((key) => (
        <ValidationError key={key} message={errors[key].message} />
      ))}
    </>
  );
}

export default AddCommandForm;
