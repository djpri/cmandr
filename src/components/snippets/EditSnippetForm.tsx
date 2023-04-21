import { Button,  Input, Select, Stack, chakra } from "@chakra-ui/react";
import CUIAutoComplete from "components/shared/ChakraUIAutoComplete";
import useSnippets from "hooks/snippets/useSnippets";
import { SnippetReadDto, SnippetUpdateDto } from "models/snippets";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CodeEditor from "./CodeEditor";
import { languagesAsItems } from "./languages";
import useCategories from "../../hooks/categories/useCategories";

type IProps = {
  snippetItem: SnippetReadDto;
  onClose: () => void;
};

function EditSnippetForm({ snippetItem, onClose }: IProps) {
  const { query: allCategoriesQuery } = useCategories("snippet");
  const { editSnippetMutation } = useSnippets();

  const {
    id,
    title,
    description,
    code,
    language,
    starred,
  } = snippetItem;

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SnippetUpdateDto>({
    defaultValues: {
      title,
      description,
      code,
      language,
      categoryId: snippetItem.category.id,
      starred,
    },
  });
  const selectCodeValue = watch("code");
  const selectLanguageValue = watch("language");

  const onSubmit = (values) => {
    editSnippetMutation.mutate({ id, body: values });
    reset({ title: "", description: "", language: "", categoryId: -1 });
    // closes popover if using form from popover only
    if (onClose) onClose();
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

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <Stack mb="10" mt="3">
        <Input
          {...register("description")}
          placeholder="Description for code snippet"
        />

        <CUIAutoComplete
          items={languagesAsItems ?? []}
          value={selectLanguageValue}
          placeholder="Language (select dropdown item to change editor language)"
          label="Language"
          handleChooseItem={(langId) => {
            handleLanguageValueChange(langId);
          }}
        />

        <CodeEditor
          handleCodeSnippetChange={handleCodeSnippetChange}
          value={selectCodeValue}
          defaultLanguage={selectLanguageValue}
          setDefaultLanguage={handleLanguageValueChange}
        />

        <Select {...register("categoryId")}>
          <option value="">Select Category</option>
          {allCategoriesQuery.data &&
            allCategoriesQuery.data
              .filter((category) => category.isGroup === false)
              .map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
        </Select>

        <Button type="submit">Save</Button>
      </Stack>
    </chakra.form>
  );
}

export default EditSnippetForm;
