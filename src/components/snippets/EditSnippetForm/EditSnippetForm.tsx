import {
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  Stack,
  chakra,
} from "@chakra-ui/react";
import CUIAutoComplete from "components/shared/ChakraUIAutoComplete";
import useSnippets from "hooks/entities/useSnippets";
import { SnippetReadDto, SnippetUpdateDto } from "models/snippets";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useCategories from "../../../hooks/categories/useCategories";
import CodeEditor from "../CodeEditor";
import { languagesAsItems } from "../languages";
import { snippetFormUtils } from "../snippetFormUtils";

type IProps = {
  snippetItem: SnippetReadDto;
  onClose: () => void;
};

const { labels, registerOptions, ValidationError } = snippetFormUtils;

function EditSnippetForm({ snippetItem, onClose }: IProps) {
  const { query: allCategoriesQuery } = useCategories("snippet");
  const { editSnippetMutation } = useSnippets();

  const { id, title, description, code, language, starred } = snippetItem;

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
    // ensure that categoryId is a number before submitting
    values.categoryId = parseInt(values.categoryId.toString());
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
    register("code", registerOptions.code);
    register("language", registerOptions.language);
  }, [register]);

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <Stack mb="10" mt="3">
        <Box>
          <FormLabel htmlFor="description">{labels.description}</FormLabel>
          <Input
            {...register("description", registerOptions.description)}
            placeholder="Description for code snippet"
          />
        </Box>

        <Box>
          <FormLabel htmlFor="language">{labels.language}</FormLabel>
          <CUIAutoComplete
            items={languagesAsItems ?? []}
            value={selectLanguageValue}
            placeholder="Language (select dropdown item to change editor language)"
            label="Language"
            handleChooseItem={(langId) => {
              handleLanguageValueChange(langId);
            }}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="code">{labels.code}</FormLabel>
          <CodeEditor
            handleCodeSnippetChange={handleCodeSnippetChange}
            value={selectCodeValue}
            defaultLanguage={selectLanguageValue}
            setDefaultLanguage={handleLanguageValueChange}
          />
        </Box>

        <Box>
          <FormLabel htmlFor="categoryId">{labels.category}</FormLabel>
          <Select {...register("categoryId", registerOptions.category)}>
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
        </Box>

        <Button type="submit">Save</Button>
      </Stack>
      {errors && (
        <Box mb={16}>
          {Object.keys(errors)?.map((key) => (
            <ValidationError key={key} message={errors[key].message} />
          ))}
        </Box>
      )}
    </chakra.form>
  );
}

export default EditSnippetForm;
