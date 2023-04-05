import { Box, Button, FormLabel, Grid, Input, Select } from "@chakra-ui/react";
import CUIAutoComplete from "components/shared/ChakraUIAutoComplete";
import useSnippetCategories from "hooks/snippets/useSnippetCategories";
import { SnippetCreateDto } from "models/snippets";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CodeEditor from "./CodeEditor";
import { languagesAsItems } from "./languages";
import { ValidationError } from "./snippetFormUtils";
import useSnippets from "hooks/snippets/useSnippets";
import { CategoryReadDto } from "models/category";

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
  const selectLanguageValue = watch("language");

  useEffect(() => {
    if (categoryId) {
      setShowCategorySelect(false);
      setValue("categoryId", categoryId);
    } else {
      setShowCategorySelect(true);
    }
  }, [categoryId, setValue]);

  const onSubmit = (values) => {
    addSnippetMutation.mutate(values);
    // console.log(values);
    reset({ title: "", description: "", code: "", categoryId: categoryId || -1 });
  };

  const handleCodeSnippetChange = (value) => {
    setValue("code", value);
  };

  const handleLanguageValueChange = (value) => {
    setValue("language", value);
  };

  useEffect(() => {
    register("code");
  }, [register]);

  const [defaultLanguage, setDefaultLanguage] = useState("javascript");
  // const [availableLanguages, setavailableLanguages] = useState(second)

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
          <CUIAutoComplete
            items={languagesAsItems ?? []}
            value={selectLanguageValue}
            placeholder="Language (select dropdown item to change editor language)"
            label="Language"
            handleChooseItem={(langId) => {
              setDefaultLanguage(langId);
              handleLanguageValueChange(langId);
            }}
          />
          <CodeEditor
            handleCodeSnippetChange={handleCodeSnippetChange}
            value={selectCodeValue}
            defaultLanguage={defaultLanguage}
            setDefaultLanguage={setDefaultLanguage}
          />

          {showCategorySelect && (
            <Box>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Select {...register("categoryId", { min: 1 })}>
                <option value={-1}>Select Category</option>
                {query?.data?.filter((cat: CategoryReadDto) => !cat.isGroup).map((category, index) => (
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
