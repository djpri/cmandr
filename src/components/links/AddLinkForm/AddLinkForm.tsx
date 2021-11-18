import { Button, FormLabel, Input, Select, Grid, Box } from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCategoriesAsKeyValuePairs } from "../../../redux/commands/commandsSlice";
import { selectLinkCategories } from "../../../redux/links/linksSlice";
import { useAddCommand } from "../../../services/commands/addCommandToDB";
import { useAddLink } from "../../../services/links/addLinkToDB";
import { Link, LinkCategory } from "../../../types/types";

function AddLinkForm() {
  const categories: LinkCategory[] = useSelector(selectLinkCategories);
  const categoryList = useSelector(selectCategoriesAsKeyValuePairs);
  const params: { id: string } = useParams();
  const [showCategorySelect, setShowCategorySelect] = useState(true);
  const { handleSubmit, register, reset, setValue, getValues } =
    useForm<Link>();
  const { addLinkToDB } = useAddLink();

  useEffect(() => {
    if (params && params.id) {
      setShowCategorySelect(false);
      setValue("category.id", parseInt(params.id));
    } else {
      setShowCategorySelect(true);
    }
  }, [params, setValue]);

  const onSubmit = (values: Link) => {
    setValue("category.name", "docs");
    addLinkToDB(values);
    // alert(JSON.stringify(values));
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
            <Select {...register("category.id")}>
              <option value="">Select Category</option>
              {categories &&
                categories.map((category, index) => (
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
