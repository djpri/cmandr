import { useRef } from "react";
import { useDrop } from "react-dnd";

interface DragItemType {
  index: number;
  id: number;
  type: string;
  dropType: "sort" | "addToGroup" | "none";
}

function useAddToCategoryDropItem({
  type,
  isGroup,
  handleAddCategoryToGroup,
  id,
}) {
  const ref = useRef<HTMLDivElement>(null);
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

  const isAddToGroupDropActive = canDrop && isOver;

  return {
    sortDrop: {
      isOver,
      canDrop,
    },
    addToCategoryDrop: {
      addToCategorydropRef,
    },
    isAddToGroupDropActive,
  };
}

export default useAddToCategoryDropItem;
