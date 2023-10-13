import { AxiosResponse } from "axios";
import {
  CategoryReadDto,
  CategoryUpdateDto,
  mapToCategoryUpdateDto,
} from "models/category";
import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { UseMutationResult } from "@tanstack/react-query";
import { Entity } from "models/entity";

interface DragItemType {
  index: number;
  id: number;
  type: Entity;
  dropType: "sort" | "addToGroup" | "none";
  isGroup: boolean;
}

function useRemoveFromGroupDropItem(
  type: Entity,
  editCategoryMutation: UseMutationResult<
    AxiosResponse<unknown, unknown>,
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
    (categoryIdToAdd: number) => {
      const categoryToUpdate = categories?.find(
        (cat) => cat.id === categoryIdToAdd
      );
      categoryToUpdate.parentId = null;
      if (!categoryToUpdate) {
        return;
      }

      editCategoryMutation.mutate({
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
