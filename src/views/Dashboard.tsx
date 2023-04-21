import {
  Box,
  Button,
  Grid,
  Heading,
  Spinner,
  useColorModeValue,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { AddCategory } from "components/categories";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import useCategories from "hooks/categories/useCategories";
import useSortCategories from "hooks/categories/useSortCategories";
import useSettings from "hooks/settings/useSettings";
import { CategoryReadDto } from "models/category";
import { UserSettings } from "models/user";
import { FC, lazy, useMemo } from "react";
import { Entity } from "../models/entity";

const UserLayout = lazy(() => import("../components/layout/UserLayout"));

type SortButtonProps = {
  type: Entity;
  settings: UserSettings;
};

function CategoriesGrid({ entityType, categoriesQuery, entityRoute }) {
  const baseHue = 184;
  const categories = useMemo(() => {
    if (categoriesQuery.data?.length <= 0) return [];
    return categoriesQuery.data?.filter((c) => c.parentId <= 0);
  }, [categoriesQuery]);

  return (
    <>
      <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
        {categories?.map((item: CategoryReadDto, index: number) => (
          <CategoryLinkButton
            routeType={entityRoute}
            key={item.id}
            item={item}
            hue={item?.isGroup ? baseHue + index + 80 : baseHue + index}
          />
        ))}
        {categoriesQuery.isLoading && <Spinner />}
      </Grid>
      <VStack spacing={2} my={5} align="flex-start">
        <AddCategory isGroup entityType={entityType} />
        <AddCategory entityType={entityType} />
      </VStack>
    </>
  );
}

function Dashboard() {
  const { query: commandCategoryQuery } = useCategories("command");
  const { query: linkCategoryQuery } = useCategories("link");
  const { query: snippetCategoryQuery } = useCategories("snippet");
  const { query: settingsQuery } = useSettings();

  const SortButtons: FC<SortButtonProps> = ({ type, settings }) => {
    const {
      sortCategoriesAscending,
      sortCategoriesDescending,
      sortCategoriesByItemCount,
    } = useSortCategories(type);
    const selectedSortBgColor = useColorModeValue("gray.100", "teal.600");
    const sortSetting =
      type === "command"
        ? settings.commandCategoriesSort
        : settings.linkCategoriesSort;

    const noCategoryData =
      !commandCategoryQuery.data || !linkCategoryQuery.data;

    return (
      <Wrap my={4}>
        <Button
          variant="options"
          bgColor={sortSetting === "ascending" && selectedSortBgColor}
          onClick={sortCategoriesAscending}
          disabled={noCategoryData || sortSetting === "ascending"}
        >
          Sort A-Z
        </Button>
        <Button
          variant="options"
          bgColor={sortSetting === "descending" && selectedSortBgColor}
          onClick={sortCategoriesDescending}
          disabled={noCategoryData || sortSetting === "descending"}
        >
          Sort Z-A
        </Button>
        <Button
          variant="options"
          bgColor={sortSetting === "size" && selectedSortBgColor}
          onClick={sortCategoriesByItemCount}
          disabled={noCategoryData || sortSetting === "size"}
        >
          Sort by size
        </Button>
      </Wrap>
    );
  };

  return (
    <UserLayout>
      <Box fontSize="xl" pb={16}>
        <Heading as="h1" fontSize="3xl">
          Commands
        </Heading>
        {settingsQuery.data && (
          <SortButtons type="command" settings={settingsQuery.data} />
        )}
        <CategoriesGrid
          entityType="command"
          entityRoute="commands"
          categoriesQuery={commandCategoryQuery}
        />

        <Heading as="h1" fontSize="3xl">
          Links
        </Heading>
        {settingsQuery.data && (
          <SortButtons type="link" settings={settingsQuery.data} />
        )}
        <CategoriesGrid
          entityType="link"
          entityRoute="links"
          categoriesQuery={linkCategoryQuery}
        />

        <Heading as="h1" fontSize="3xl">
          Snippets
        </Heading>
        {settingsQuery.data && (
          <SortButtons type="snippet" settings={settingsQuery.data} />
        )}
        <CategoriesGrid
          entityType="snippet"
          entityRoute="snippets"
          categoriesQuery={snippetCategoryQuery}
        />
      </Box>
    </UserLayout>
  );
}

export default Dashboard;
