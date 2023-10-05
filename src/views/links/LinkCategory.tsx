import {
  Box,
  Grid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import AddCategory from "components/categories/AddCategory";
import LinksManager from "components/links/LinksManager/LinksManager";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import useLinks from "hooks/entities/useLinks";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import EntityPage from "views/EntityPage";
import useCategories from "../../hooks/categories/useCategories";
import EditableCategory from "components/shared/EditableCategory";

function LinkCategory() {
  const { id: categoryId } = useParams();
  const { query } = useLinks(parseInt(categoryId));
  const { query: categoriesQuery } = useCategories("link");

  const category = useMemo(() => {
    if (categoriesQuery.data) {
      return categoriesQuery.data?.find(
        (item) => item.id === parseInt(categoryId)
      );
    }
  }, [categoryId, categoriesQuery.data]);

  const subCategories = useMemo(() => {
    if (!categoriesQuery.data) return null;
    return categoriesQuery.data.filter(
      (item) => item.parentId === parseInt(categoryId)
    );
  }, [categoriesQuery.data, categoryId]);

  if (!query.data || !category) {
    return <Spinner />;
  }

  return (
    <EntityPage
      numItems={category?.items}
      headerOptions={
        <Box m="0" p="0">
          <EditableCategory
            category={category}
            entity="link"
          />
        </Box>
      }
    >
      {query.isLoading && <Spinner mb={5} />}
      {!category?.isGroup && (
        <LinksManager
          categoryId={category ? category.id : null}
          links={query.data}
        />
      )}
      {subCategories && (
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {subCategories.map((item) => (
            <CategoryLinkButton
              item={item}
              entityType="link"
              routeType="links"
              key={item.id}
              hue={201}
            />
          ))}
        </Grid>
      )}
      {category.isGroup && (
        <VStack spacing={2} my={5} align="flex-start">
          <AddCategory parentId={category.id} entityType="link" />
        </VStack>
      )}
    </EntityPage>
  );
}

export default LinkCategory;
