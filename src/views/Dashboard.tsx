import {
  Box,
  Button,
  Grid,
  Heading,
  Spinner,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { AddCategory } from "components/categories";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import useCategories from "hooks/categories/useCategories";
import useSortCategories from "hooks/categories/useSortCategories";
import { CategoryReadDto } from "models/category";
import { FC, lazy, useMemo } from "react";
import { selectCategoriesSort } from "redux/slices/settingsSlice";
import { useAppSelector } from "redux/store";
import { entityRoute } from "routes";
import { Entity } from "../models/entity";

const UserLayout = lazy(() => import("../components/layout/UserLayout"));
type SortType = "manual" | "ascending" | "descending" | "size";

type SortButtonProps = {
  type: Entity;
  sortOption: SortType;
};

type CategoriesGridProps = {
  entityType: Entity;
  entityRoute: entityRoute;
};

function CategoriesGrid({ entityType, entityRoute }: CategoriesGridProps) {
  const baseHue = 184;
  const { query } = useCategories(entityType);
  const categories = useMemo(() => {
    if (query.data?.length <= 0) return [];
    return query.data?.filter((c) => c.parentId <= 0);
  }, [query]);

  return (
    <>
      <Grid
        my="30px"
        gap={3}
        templateColumns="repeat(auto-fill, 250px)"
        data-cy={`categories-grid ${entityType}`}
      >
        {categories?.map((item: CategoryReadDto, index: number) => (
          <CategoryLinkButton
            entityType={entityType}
            routeType={entityRoute}
            key={item.id}
            item={item}
            hue={item?.isGroup ? baseHue + index + 80 : baseHue + index}
          />
        ))}
        {query.isLoading && <Spinner />}
      </Grid>
      <VStack spacing={2} my={5} align="flex-start">
        <AddCategory isGroup entityType={entityType} />
        <AddCategory entityType={entityType} />
      </VStack>
    </>
  );
}

function Dashboard() {
  const categorySortOptions = useAppSelector(selectCategoriesSort);

  const SortButtons: FC<SortButtonProps> = ({ type, sortOption }) => {
    const {
      categoriesAvailable,
      sortCategoriesAscending,
      sortCategoriesDescending,
      sortCategoriesByItemCount,
    } = useSortCategories(type);

    const buttonsData = [
      {
        id: 1,
        text: "Sort A-Z",
        sortOption: "ascending",
        onClick: sortCategoriesAscending,
      },
      {
        id: 2,
        text: "Sort Z-A",
        sortOption: "descending",
        onClick: sortCategoriesDescending,
      },
      {
        id: 3,
        text: "Sort by size",
        sortOption: "size",
        onClick: sortCategoriesByItemCount,
      },
    ];

    return (
      <Wrap my={4}>
        {buttonsData.map((button) => (
          <Button
            key={button.id}
            variant="options"
            border={sortOption === button.sortOption ? "2px" : "none"}
            borderColor={"hsla(254, 54%, 81%, 0.5)"}
            rounded="md"
            onClick={button.onClick}
            isDisabled={!categoriesAvailable || sortOption === button.sortOption}
          >
            {button.text}
          </Button>
        ))}
      </Wrap>
    );
  };

  return (
    <UserLayout>
      <Box fontSize="xl" pb={16} data-cy="dashboard">
        <Heading as="h1" fontSize="2xl">
          Commands
        </Heading>
        {categorySortOptions["command"] && (
          <SortButtons
            type="command"
            sortOption={categorySortOptions["command"]}
          />
        )}
        <CategoriesGrid entityType="command" entityRoute="commands" />

        <Heading as="h1" fontSize="2xl">
          Links
        </Heading>
        {categorySortOptions["link"] && (
          <SortButtons type="link" sortOption={categorySortOptions["link"]} />
        )}
        <CategoriesGrid entityType="link" entityRoute="links" />

        <Heading as="h1" fontSize="2xl">
          Snippets
        </Heading>
        {categorySortOptions["snippet"] && (
          <SortButtons
            type="snippet"
            sortOption={categorySortOptions["snippet"]}
          />
        )}
        <CategoriesGrid entityType="snippet" entityRoute="snippets" />
      </Box>
    </UserLayout>
  );
}

export default Dashboard;
