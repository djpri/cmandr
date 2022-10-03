import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DragItemType {
  index: number;
  id: number;
  type: string;
  dropType: "sort" | "addToGroup" | "none";
}

function useSortDropItem({ moveCard, id, sortIndex, type, isGroup }) {
  const ref = useRef<HTMLDivElement>(null);
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

  const isSortDropActive = canDrop_2 && isOver_2;
  return {
    sortDrop: {
      ref: sortDropRef,
      isOver: isOver_2,
      canDrop: canDrop_2,
    },
    drag: {
      item,
      isDragging,
      ref: drag,
    },
    isSortDropActive,
  };
}

export default useSortDropItem;
