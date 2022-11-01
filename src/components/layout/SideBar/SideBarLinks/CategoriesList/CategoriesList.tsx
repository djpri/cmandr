import { AccordionItem, Flex, Spinner } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import AddCommandCategory from "components/commandCategories/AddCommandCategory";
import AddLinkCategory from "components/linkCategories/AddLinkCategory/AddLinkCategory";
import { CategoryReadDto, CategoryUpdateDto } from "models/category";
import { useCallback, useMemo } from "react";
import { UseMutationResult, UseQueryResult } from "react-query";
import DragItem from "./DnD/DragItem";

interface IProps {
  query: UseQueryResult<CategoryReadDto[]>;
  type: "commands" | "links";
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
      await editCategoryMutation.mutateAsync({
        id: categoryToUpdate.id,
        body: categoryToUpdate,
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
