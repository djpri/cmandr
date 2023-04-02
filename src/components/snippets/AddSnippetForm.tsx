import { Box, Button, FormLabel, Grid, Input, Select } from "@chakra-ui/react";
import useSnippetCategories from "hooks/snippets/useSnippetCategories";
import useSnippets from "hooks/snippets/useSnippets";
import { SnippetCreateDto } from "models/snippets";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ValidationError } from "./snippetFormUtils";
import CodeEditor from "./CodeEditor";

interface IProps {
  categoryId?: number;
}

function AddSnippetForm({ categoryId }: IProps) {
  const { addSnippetMutation } = useSnippets();
  const { query } = useSnippetCategories();
  const [showCategorySelect, setShowCategorySelect] = useState(true);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SnippetCreateDto>();
  const selectCodeValue = watch("code");

  useEffect(() => {
    if (categoryId) {
      setShowCategorySelect(false);
      setValue("categoryId", categoryId);
    } else {
      setShowCategorySelect(true);
    }
  }, [categoryId, setValue]);

  const onSubmit = (values: SnippetCreateDto) => {
    // addSnippetMutation.mutate(values);
    reset({ title: "", categoryId: categoryId || -1 });
  };

  const handleCodeSnippetChange = (value) => {
    setValue('code', value);
  };

  useEffect(() => {
    register("code");
  }, [register]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Grid
          mb={5}
          templateColumns={["repeat(1, 1fr)"]}
          gap={6}
          alignItems="end"
        >
              <Box>
                <Input
                  {...register("description")}
                  placeholder="Description for code snippet"
                />
              </Box>
          <Box maxH="50vh">
            <CodeEditor handleCodeSnippetChange={handleCodeSnippetChange} value={selectCodeValue}/>
          </Box>

          <Box>
            <FormLabel htmlFor="language">Language</FormLabel>
            <Input
              {...register("language")}
              placeholder="Language of code snippet"
            />
          </Box>

          {showCategorySelect && (
            <Box>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Select {...register("categoryId", { min: 1 })}>
                <option value={-1}>Select Category</option>
                {query?.data?.map((category, index) => (
                  <option value={category.id} key={index}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Box>
          )}

          <Button
            type="submit"
            variant="add"
            size="sm"
            isLoading={addSnippetMutation.isLoading}
            maxW="15rem"
          >
            Add snippet
          </Button>
        </Grid>
      </form>
      {errors.categoryId && (
        <ValidationError message="* Category is required" />
      )}
    </>
  );
}

export default AddSnippetForm;
