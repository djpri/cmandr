import { AccordionItem, Flex, Spinner } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import AddCommandCategory from "components/commandCategories/AddCommandCategory/AddCommandCategory";
import AddLinkCategory from "components/linkCategories/AddLinkCategory/AddLinkCategory";
import update from "immutability-helper";
import {
  CategoryDisplayIndexDto,
  CategoryReadDto,
  CategoryUpdateDto,
} from "models/category";
import { useCallback, useMemo, useState } from "react";
import { UseMutationResult, UseQueryResult } from "react-query";
import DragItem from "./DragItem";

interface IProps {
  query: UseQueryResult<CategoryReadDto[]>;
  type: "commands" | "links";
  manualSortMutation: UseMutationResult<
    AxiosResponse<unknown, unknown>,
    unknown,
    CategoryDisplayIndexDto[]
  >;
  editCategoryMutation: UseMutationResult<
    AxiosResponse<unknown, unknown>,
    unknown,
    {
      id: number;
      body: CategoryUpdateDto;
    }
  >;
}

function CategoriesList({
  query,
  type,
  manualSortMutation,
  editCategoryMutation,
}: IProps) {
  const [selectedIndex, setSelectedIndex] = useState({});

  const categories = useMemo(() => {
    if (!query.data) return [];
    return query.data;
  }, [query]);

  const [topLevelCategories, setTopLevelCategories] = useState(
    categories.filter((item: CategoryReadDto) => item?.parentId === 0) || []
  );

  const moveCard = useCallback(
    async (dragIndex: number, hoverIndex: number) => {
      setTopLevelCategories((prevCards: CategoryReadDto[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as CategoryReadDto],
          ],
        })
      );
      const newCategories = update(topLevelCategories, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, topLevelCategories[dragIndex] as CategoryReadDto],
        ],
      });
      const categorySortDtos = newCategories?.map((category, index) => {
        return { id: category.id, displayIndex: index };
      });
      await manualSortMutation.mutateAsync(categorySortDtos);
    },
    [manualSortMutation, topLevelCategories]
  );

  const handleAddCategoryToGroup = useCallback(
    async (categoryIdToAdd: number, targetGroupId: number) => {
      const categoryToUpdate = categories?.find(
        (cat) => cat.id === categoryIdToAdd
      );
      categoryToUpdate.parentId = targetGroupId;
      await editCategoryMutation.mutateAsync({
        id: categoryToUpdate.id,
        body: categoryToUpdate,
      });
    },
    [categories, editCategoryMutation]
  );

  const renderCategoryItem = useCallback(
    (item, index) => {
      const categoryItemProps = {
        item,
        isChild: false,
        depth: 0,
        type,
        categories,
      };
      return (
        <DragItem
          moveCard={moveCard}
          sortIndex={index}
          id={item.id}
          key={item.id}
          handleAddCategoryToGroup={handleAddCategoryToGroup}
          type={type}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          isGroup={item.isGroup}
          {...categoryItemProps}
        />
      );
    },
    [moveCard, handleAddCategoryToGroup, type, selectedIndex, categories]
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
