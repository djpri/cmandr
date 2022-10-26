import { AxiosResponse } from "axios";
import {
  CategoryReadDto,
  CategoryUpdateDto,
  mapToCategoryUpdateDto,
} from "models/category";
import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { UseMutationResult } from "react-query";

interface DragItemType {
  index: number;
  id: number;
  type: "commands" | "links";
  dropType: "sort" | "addToGroup" | "none";
  isGroup: boolean;
}

function useRemoveFromGroupDropItem(
  type: "commands" | "links",
  editCategoryMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      id: number;
      body: CategoryUpdateDto;
    },
    unknown
  >,
  categories: CategoryReadDto[]
) {
  const handleAddCategoryToGroup = useCallback(
    async (categoryIdToAdd: number) => {
      const categoryToUpdate = categories?.find(
        (cat) => cat.id === categoryIdToAdd
      );
      categoryToUpdate.parentId = null;
      if (!categoryToUpdate) {
        return;
      }

      // console.log(categoryToUpdate);
      await editCategoryMutation.mutateAsync({
        id: categoryIdToAdd,
        body: mapToCategoryUpdateDto(categoryToUpdate),
      });
    },
    [editCategoryMutation, categories]
  );

  const [{ isOver, canDrop }, addToCategoryDropRef] = useDrop<
    DragItemType,
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: type,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
    drop(item) {
      if (!item.isGroup) handleAddCategoryToGroup(item.id);
    },
    canDrop: (item) => !item.isGroup,
  });

  const isAddToGroupDropActive = canDrop && isOver;

  return {
    addToCategoryDropRef,
    isAddToGroupDropActive,
  };
}

export default useRemoveFromGroupDropItem;
