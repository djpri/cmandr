import {
  Box,
  Button,
  FormLabel,
  Grid,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import useLinkCategories from "hooks/links/useLinkCategories";
import useLinks from "hooks/links/useLinks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LinkCreateDto } from "../../../models/link";

interface IProps {
  categoryId?: number;
}

/**
 * Form for adding new links created with react-hook-form
 * @see https://react-hook-form.com/get-started
 */
function AddLinkForm({ categoryId }: IProps) {
  const { addLinkMutation } = useLinks();
  const { query } = useLinkCategories();
  const [showCategorySelect, setShowCategorySelect] = useState(true);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LinkCreateDto>();

  useEffect(() => {
    if (categoryId) {
      setShowCategorySelect(false);
      setValue("categoryId", categoryId);
    } else {
      setShowCategorySelect(true);
    }
  }, [categoryId, setValue]);

  const onSubmit = (values: LinkCreateDto) => {
    addLinkMutation.mutate(values);
    reset({ url: "", title: "", categoryId: categoryId || -1 });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Grid
          mb={5}
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
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input {...register("title")} placeholder="Title for link" />
          </Box>

          <Box>
            <FormLabel htmlFor="link">Link</FormLabel>
            <Input
              {...register("url", {
                required: "Please enter a link",
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: "Please enter a valid link",
                },
              })}
              placeholder="URL for link"
            />
          </Box>

          {showCategorySelect && (
            <Box>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Select {...register("categoryId", { min: 1 })}>
                <option value={-1}>Select Category</option>
                {query.data &&
                  query.data.map((category, index) => (
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
            isFullWidth={false}
            isLoading={addLinkMutation.isLoading}
          >
            Add link
          </Button>
        </Grid>
      </form>
      {errors.categoryId && (
        <Text display="block" color="red.500" fontWeight="bold">
          * Category is required
        </Text>
      )}
      {errors.url && (
        <Text display="block" color="red.500" fontWeight="bold">
          * {errors.url.message}
        </Text>
      )}
    </>
  );
}

export default AddLinkForm;
