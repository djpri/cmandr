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
import { CategoryReadDto } from "models/category";
import { FC, lazy, useMemo } from "react";
import { Entity } from "../models/entity";
import { UseQueryResult } from "@tanstack/react-query";
import { entityRoute } from "routes";
import { useAppSelector } from "redux/store";
import { selectCategoriesSort } from "redux/slices/settingsSlice";

const UserLayout = lazy(() => import("../components/layout/UserLayout"));
type SortType = "manual" | "ascending" | "descending" | "size";

type SortButtonProps = {
  type: Entity;
  sortOption: SortType;
};

type CategoriesGridProps = {
  entityType: Entity;
  categoriesQuery: UseQueryResult<CategoryReadDto[]>;
  entityRoute: entityRoute;
};

function CategoriesGrid({ entityType, categoriesQuery, entityRoute }: CategoriesGridProps) {
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

  const categorySortOptions = useAppSelector(selectCategoriesSort);

  const SortButtons: FC<SortButtonProps> = ({ type, sortOption }) => {
    const {
      sortCategoriesAscending,
      sortCategoriesDescending,
      sortCategoriesByItemCount,
    } = useSortCategories(type);
    const selectedSortBgColor = useColorModeValue("gray.100", "teal.600");

    const noCategoryData =
      !commandCategoryQuery.data || !linkCategoryQuery.data || !snippetCategoryQuery.data;

    return (
      <Wrap my={4}>
        <Button
          variant="options"
          bgColor={sortOption === "ascending" && selectedSortBgColor}
          onClick={sortCategoriesAscending}
          disabled={noCategoryData || sortOption === "ascending"}
        >
          Sort A-Z
        </Button>
        <Button
          variant="options"
          bgColor={sortOption === "descending" && selectedSortBgColor}
          onClick={sortCategoriesDescending}
          disabled={noCategoryData || sortOption === "descending"}
        >
          Sort Z-A
        </Button>
        <Button
          variant="options"
          bgColor={sortOption === "size" && selectedSortBgColor}
          onClick={sortCategoriesByItemCount}
          disabled={noCategoryData || sortOption === "size"}
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
        {categorySortOptions["command"] && (
          <SortButtons type="command" sortOption={categorySortOptions["command"]} />
        )}
        <CategoriesGrid
          entityType="command"
          entityRoute="commands"
          categoriesQuery={commandCategoryQuery}
        />

        <Heading as="h1" fontSize="3xl">
          Links
        </Heading>
        {categorySortOptions["link"] && (
          <SortButtons type="link" sortOption={categorySortOptions["link"]} />
        )}
        <CategoriesGrid
          entityType="link"
          entityRoute="links"
          categoriesQuery={linkCategoryQuery}
        />

        <Heading as="h1" fontSize="3xl">
          Snippets
        </Heading>
        {categorySortOptions["snippet"] && (
          <SortButtons type="snippet" sortOption={categorySortOptions["snippet"]} />
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
