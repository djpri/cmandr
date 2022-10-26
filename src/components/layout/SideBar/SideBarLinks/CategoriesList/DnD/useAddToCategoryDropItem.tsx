import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DragItemType {
  index: number;
  id: number;
  type: string;
  dropType: "sort" | "addToGroup" | "none";
  isGroup: boolean;
}

function useAddToCategoryDropItem({
  type,
  isGroup,
  handleAddCategoryToGroup,
  id,
}) {
  const ref = useRef<HTMLDivElement>(null);

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
      if (!ref.current) return;
      const droppedOntoSelf = item.id === id;
      if (droppedOntoSelf) return;
      if (isGroup && !droppedOntoSelf) handleAddCategoryToGroup(item.id, id);
    },
    // to prevent nesting of groups
    canDrop: (item) => !item.isGroup && isGroup && item.id !== id,
    hover(item: DragItemType) {
      if (!ref.current) return;
      if (item.id === id) return;
      item.dropType = isGroup ? "addToGroup" : "sort";
    },
  });

  const [{ item, isDragging }, drag] = useDrag({
    type,
    item: () => ({ id, isGroup, dropType: "none" }),
    isDragging(monitor) {
      return monitor.getItem().id === id;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  const isAddToGroupDropActive = canDrop && isOver;

  return {
    ref,
    isAddToGroupDropActive,
    isDragging,
    dropType: item?.dropType,
    addToCategoryDropRef,
    drag,
  };
}

export default useAddToCategoryDropItem;
