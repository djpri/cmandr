import { Box, Grid, Spinner, VStack } from "@chakra-ui/react";
import AddCategory from "components/categories/AddCategory";
import CommandsManager from "components/commands/CommandsManager/CommandsManager";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import EditableCategory from "components/shared/EditableCategory";
import useCategories from "hooks/categories/useCategories";
import useCommands from "hooks/entities/useCommands";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import EntityPage from "views/EntityPage";

function CommandCategoryPage() {
  const { id: categoryId } = useParams();
  const { query } = useCommands(parseInt(categoryId));
  const { query: categoriesQuery } = useCategories("command");

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

  const HeaderOptions = () => (
    <Box m="0" p="0">
      <EditableCategory
        category={category}
        entity="command"
      />
    </Box>
  );

  return (
    <EntityPage
      numItems={category?.items}
      headerOptions={<HeaderOptions />}
    >
      {query.isLoading && <Spinner mb={5} />}
      {!category?.isGroup && (
        <CommandsManager
          categoryId={category ? category.id : null}
          commands={query.data}
        />
      )}
      {subCategories && (
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {subCategories.map((item) => (
            <CategoryLinkButton
              item={item}
              entityType="command"
              routeType="commands"
              key={item.id}
              hue={201}
            />
          ))}
        </Grid>
      )}
      {category.isGroup && (
        <VStack spacing={2} my={5} align="flex-start">
          <AddCategory parentId={category.id} entityType="command" />
        </VStack>
      )}
    </EntityPage>
  );
}

export default CommandCategoryPage;
