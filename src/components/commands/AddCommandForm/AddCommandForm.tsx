import {
  Box,
  Button,
  FormLabel,
  Grid,
  Input,
  Select,
} from "@chakra-ui/react";
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
              {...register("description", registerOptions.description)}
              placeholder="Description of what command does"
            />
          </Box>

          <Box>
            <FormLabel htmlFor="line">Command</FormLabel>
            <Input
              {...register("line", registerOptions.line)}
              placeholder="Command"
            />
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
              {...register("reference", registerOptions.reference)}
              placeholder="Reference"
            />
          </Box>

          <Button
            type="submit"
            variant="add"
            size="sm"
            isLoading={addCommandMutation.isLoading}
          >
            Add command
          </Button>
        </Grid>
      </form>
      {errors.description && (
        <ValidationError message={errors.description.message} />
      )}
      {errors.line && (
        <ValidationError message={errors.line.message} />
      )}
      {errors.reference && (
        <ValidationError message={errors.reference.message} />
      )}
    </>
  );
}

export default AddCommandForm;
