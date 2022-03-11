import { Box, Button, FormLabel, Grid, Input, Select } from "@chakra-ui/react";
import useLinkCategories from "hooks/useLinkCategories";
import useLinks from "hooks/useLinks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { LinkCreateDto } from "../../../models/link";

function AddLinkForm() {
  const { addLinkMutation } = useLinks();
  const { query: allCategoriesQuery } = useLinkCategories();
  const params = useParams();
  const [showCategorySelect, setShowCategorySelect] = useState(true);
  const { handleSubmit, register, reset, setValue } = useForm<LinkCreateDto>();

  useEffect(() => {
    if (params) {
      setShowCategorySelect(false);
    } else {
      setShowCategorySelect(true);
    }
  }, [params, setValue]);

  const onSubmit = (values: LinkCreateDto) => {
    // addLinkMutation.mutate(values);
    alert(JSON.stringify(values));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid
        mb="10"
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
          <Input {...register("link")} placeholder="Link URL" />
        </Box>

        {showCategorySelect && (
          <Box>
            <FormLabel htmlFor="category">Category</FormLabel>
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

        <Button type="submit" colorScheme="green" size="sm" isFullWidth={false}>
          Add link
        </Button>
      </Grid>
    </form>
  );
}

export default AddLinkForm;
