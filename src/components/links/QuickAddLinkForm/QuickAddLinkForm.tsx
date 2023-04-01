import { Box, Button, FormLabel, Grid, Input, Select } from "@chakra-ui/react";
import useLinkCategories from "hooks/links/useLinkCategories";
import useLinks from "hooks/links/useLinks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { urlRegisterOptions, ValidationError } from "../linkFormUtils";

interface IProps {
  categoryId?: number;
}

/**
 * Form for adding new links created with react-hook-form
 * @see https://react-hook-form.com/get-started
 */
interface FormValues {
  url: string;
  categoryId: number;
}

function QuickAddLinkForm({ categoryId }: IProps) {
  const { quickAddLinkMutation } = useLinks();
  const { query } = useLinkCategories();
  const [showCategorySelect, setShowCategorySelect] = useState(true);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      url: "",
      categoryId: categoryId || -1,
    },
  });

  useEffect(() => {
    if (categoryId) {
      setShowCategorySelect(false);
      setValue("categoryId", categoryId);
    } else {
      setShowCategorySelect(true);
    }
  }, [categoryId, setValue]);

  const onSubmit = (values: FormValues) => {
    reset({ url: "", categoryId: categoryId || -1 });
    quickAddLinkMutation.mutate(values);

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
          justifyContent={"center"}
        >
          <Box>
            <FormLabel htmlFor="link">Link</FormLabel>
            <Input
              {...register("url", urlRegisterOptions)}
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
            isLoading={quickAddLinkMutation.isLoading}
          >
            Add link
          </Button>
        </Grid>
      </form>
      {errors.categoryId && (
        <ValidationError message="Category is required" />
      )}
      {errors.url && <ValidationError message={errors.url.message} />}
    </>
  );
}

export default QuickAddLinkForm;
