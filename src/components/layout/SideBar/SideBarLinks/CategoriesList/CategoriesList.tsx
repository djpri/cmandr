import { AccordionItem, Flex, Spinner } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import AddCommandCategory from "components/commandCategories/AddCommandCategory/AddCommandCategory";
import AddLinkCategory from "components/linkCategories/AddLinkCategory/AddLinkCategory";
import update from "immutability-helper";
import { CategoryDisplayIndexDto, CategoryReadDto } from "models/category";
import { useCallback, useMemo, useState } from "react";
import { UseMutationResult, UseQueryResult } from "react-query";
import CategoryGroup from "./CategoryGroup";
import CategoryInfo from "./CategoryInfo";
import { DragItem } from "./DragItem";

interface IProps {
  query: UseQueryResult<CategoryReadDto[], unknown>;
  type: "commands" | "links";
  manualSortMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    CategoryDisplayIndexDto[],
    unknown
  >;
}

function CategoriesList({ query, type, manualSortMutation }: IProps) {
  const categories = useMemo(() => {
    if (!query.data) return [];
    return query.data;
  }, [query]);

  const [topLevelCategories, setTopLevelCategories] = useState(
    categories.filter((item: CategoryReadDto) => item?.parentId === 0) || []
  );

  const categorySortDtos = useMemo(
    () =>
      topLevelCategories?.map((category, index) => {
        return { id: category.id, displayIndex: index };
      }),
    [topLevelCategories]
  );

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setTopLevelCategories((prevCards: CategoryReadDto[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as CategoryReadDto],
        ],
      })
    );
  }, []);

  const handleDrop = useCallback(async () => {
    await manualSortMutation.mutateAsync(categorySortDtos);
  }, [categorySortDtos, manualSortMutation]);

  const renderCategoryItem = useCallback(
    (item, index) => {
      return (
        <DragItem
          moveCard={moveCard}
          index={index}
          id={item.id}
          key={item.id}
          handleDrop={handleDrop}
          type={type}
        >
          {item.isGroup ? (
            <CategoryGroup
              item={item}
              isChild={false}
              depth={0}
              type={type}
              categories={categories}
            />
          ) : (
            <CategoryInfo
              item={item}
              isChild={false}
              depth={0}
              type={type}
              categories={categories}
            />
          )}
        </DragItem>
      );
    },
    [categories, type, moveCard, handleDrop]
  );

  if (query.isIdle) return null;

  if (query.isLoading)
    return (
      <AccordionItem p="8px 24px" borderTop="none">
        <Spinner />
      </AccordionItem>
    );
  if (query.isError)
    return (
      <AccordionItem p="8px 24px" borderTop="none">
        Error: Could not load categories
      </AccordionItem>
    );
  if (!query.data) return null;

  return (
    <>
      {topLevelCategories.map((item: CategoryReadDto, index: number) =>
        renderCategoryItem(item, index)
      )}

      <AccordionItem borderTop="none">
        <Flex pt="2" py="4" px="6" flexDirection="column" gap={2}>
          {type === "links" && (
            <>
              <AddLinkCategory isGroup />
              <AddLinkCategory />
            </>
          )}
          {type === "commands" && (
            <>
              <AddCommandCategory isGroup />
              <AddCommandCategory />
            </>
          )}
        </Flex>
      </AccordionItem>
    </>
  );
}

export default CategoriesList;
