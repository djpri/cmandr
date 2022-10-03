import { chakra } from "@chakra-ui/react";
import { CategoryReadDto } from "models/category";
import React, { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import CategoryGroup from "./CategoryGroup";
import CategoryInfo from "./CategoryInfo";

export interface CardProps {
  id: number;
  sortIndex: number;
  type: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  selectedIndex: Record<string, boolean>;
  setSelectedIndex: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  handleAddCategoryToGroup: (
    categoryIdToAdd: number,
    targetGroupId: number
  ) => void;
  isGroup: boolean;
  item: CategoryReadDto;
  isChild: boolean;
  depth: number;
  categories: CategoryReadDto[];
}

interface DragItemType {
  index: number;
  id: number;
  type: string;
  dropType: "sort" | "addToGroup" | "none";
}

const DragItem: FC<CardProps> = ({
  id,
  sortIndex,
  type,
  moveCard,
  handleAddCategoryToGroup,
  isGroup,
  item: categoryItem,
  isChild,
  depth,
  categories,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const categoryItemProps = {
    item: categoryItem,
    isChild,
    depth,
    type,
    categories,
    dragDropRef: ref,
  };

  const [{ isOver, canDrop }, addToCategorydropRef] = useDrop<
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
      const droppedOntoSelf = item.id === id;
      if (droppedOntoSelf) return;
      if (isGroup && !droppedOntoSelf) handleAddCategoryToGroup(item.id, id);
      if (!ref.current) return;
    },
    canDrop: (item) => isGroup && item.id !== id,
    hover(item: DragItemType) {
      if (!ref.current) return;
      item.dropType = isGroup ? "addToGroup" : "sort";
    },
  });

  const [{ item, isDragging }, drag] = useDrag({
    type,
    item: () => ({ id, index: sortIndex, isGroup, dropType: "none" }),
    isDragging(monitor) {
      return monitor.getItem().id === id;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  const [{ isOver_2, canDrop_2 }, sortDropRef] = useDrop<
    DragItemType,
    void,
    { isOver_2: boolean; canDrop_2: boolean }
  >({
    accept: type,
    collect: (monitor) => ({
      isOver_2: monitor.isOver({ shallow: true }),
      canDrop_2: monitor.canDrop(),
    }),
    drop(item) {
      if (!ref.current) return;
      const droppedOntoSelf = item.id === id;
      if (droppedOntoSelf) return;

      if (isGroup && !droppedOntoSelf) handleAddCategoryToGroup(item.id, id);

      if (item.dropType === "sort") {
        const dragIndex = item.index;
        moveCard(dragIndex, sortIndex);
      }
    },
    canDrop: (item) => item.id !== id,
    hover(item: DragItemType) {
      if (!ref.current) return;
      item.dropType = "sort";
    },
  });

  const opacity = isDragging ? 0.3 : 1;
  const isAddToGroupDropActive = canDrop && isOver;
  const isSortDropActive = canDrop_2 && isOver_2;

  drag(addToCategorydropRef(ref));

  return (
    <chakra.div borderRadius={isGroup && "md"}>
      <chakra.div
        opacity={isSortDropActive ? 0.2 : opacity}
        border={
          item?.dropType === "addToGroup" &&
          isAddToGroupDropActive &&
          "2px solid red"
        }
      >
        {isGroup ? (
          <CategoryGroup {...categoryItemProps} />
        ) : (
          <CategoryInfo {...categoryItemProps} />
        )}
      </chakra.div>
      <chakra.div
        pt={2}
        ref={sortDropRef}
        bgColor={isSortDropActive ? "green" : "transparent"}
        boxSizing="border-box"
      ></chakra.div>
    </chakra.div>
  );
};

export default DragItem;
