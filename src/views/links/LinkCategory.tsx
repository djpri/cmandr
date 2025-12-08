import {
  Alert,
  AlertIcon,
  Box,
  Grid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import AddCategory from "components/categories/AddCategory";
import LinksManager from "components/links/LinksManager/LinksManager";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import QueryState from "components/other/QueryState";
import EditableCategory from "components/shared/EditableCategory";
import useCategories from "hooks/categories/useCategories";
import useLinks from "hooks/entities/useLinks";
import { useParams } from "react-router-dom";
import EntityPage from "views/EntityPage";

function LinkCategory() {
  const { id: categoryId } = useParams();
  const parsedCategoryId = Number(categoryId);
  const normalizedCategoryId = Number.isNaN(parsedCategoryId)
    ? undefined
    : parsedCategoryId;
  const { query } = useLinks(normalizedCategoryId);
  const { query: categoriesQuery } = useCategories("link");

  if (Number.isNaN(parsedCategoryId)) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        This category is not valid.
      </Alert>
    );
  }

  return (
    <QueryState
      query={categoriesQuery}
      loadingText="Loading link categories"
      emptyMessage="No categories found."
    >
      {(categories) => {
        const category = categories.find(
          (item) => item.id === parsedCategoryId
        );

        if (!category) {
          return (
            <Alert status="warning" borderRadius="md">
              <AlertIcon />
              This category could not be found.
            </Alert>
          );
        }

        const subCategories = categories.filter(
          (item) => item.parentId === parsedCategoryId
        );

        return (
          <QueryState
            query={query}
            loadingText="Loading links"
            emptyMessage={
              category.isGroup
                ? "No subcategories yet."
                : "No links in this category yet."
            }
          >
            {(links) => (
              <EntityPage
                numItems={category?.items}
                headerOptions={
                  <Box m="0" p="0">
                    <EditableCategory category={category} entity="link" />
                  </Box>
                }
              >
                {query.isFetching && <Spinner mb={5} />}
                {!category?.isGroup && (
                  <LinksManager
                    categoryId={category.id}
                    links={links}
                  />
                )}
                {subCategories.length > 0 && (
                  <Grid
                    my="30px"
                    gap={3}
                    templateColumns="repeat(auto-fill, 250px)"
                  >
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
            )}
          </QueryState>
        );
      }}
    </QueryState>
  );
}

export default LinkCategory;
