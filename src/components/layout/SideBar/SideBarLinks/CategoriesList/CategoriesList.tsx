import { AccordionItem, Flex, Spinner } from "@chakra-ui/react";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  CategoryReadDto,
  CategoryUpdateDto,
  mapToCategoryUpdateDto,
} from "models/category";
import { useCallback, useMemo } from "react";
import DragItem from "./DnD/DragItem";
import AddCategory from "components/categories/AddCategory";
import { Entity } from "models/entity";

interface IProps {
  query: UseQueryResult<CategoryReadDto[]>;
  type: Entity;
  editCategoryMutation: UseMutationResult<
    AxiosResponse<unknown, unknown>,
    unknown,
    {
      id: number;
      body: CategoryUpdateDto;
    }
  >;
}

function CategoriesList({ query, type, editCategoryMutation }: IProps) {
  const categories = useMemo(() => {
    if (!query.data) return [];
    return query.data;
  }, [query]);

  const topLevelCategories = useMemo(
    () =>
      categories.filter((item: CategoryReadDto) => item?.parentId === 0) || [],
    [categories]
  );

  const handleAddCategoryToGroup = useCallback(
    async (categoryIdToAdd: number, targetGroupId: number) => {
      const categoryToUpdate = categories?.find(
        (cat) => cat.id === categoryIdToAdd
      );
      categoryToUpdate.parentId = targetGroupId;
      editCategoryMutation.mutate({
        id: categoryToUpdate.id,
        body: mapToCategoryUpdateDto(categoryToUpdate),
      });
    },
    [categories, editCategoryMutation]
  );

  const renderCategoryItem = useCallback(
    (item: CategoryReadDto, index: number) => {
      const categoryItemProps = {
        item,
        isChild: false,
        depth: 0,
        type,
        categories,
      };
      return (
        <DragItem
          sortIndex={index}
          key={item.id}
          type={type}
          handleAddCategoryToGroup={handleAddCategoryToGroup}
          isGroup={item.isGroup}
          {...categoryItemProps}
        />
      );
    },
    [type, categories, handleAddCategoryToGroup]
  );

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
          <AddCategory isGroup entityType={type} />
          <AddCategory entityType={type} />
        </Flex>
      </AccordionItem>
    </>
  );
}

export default CategoriesList;
