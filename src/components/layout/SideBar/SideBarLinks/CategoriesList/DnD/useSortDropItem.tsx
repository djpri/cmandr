import { useDrop } from "react-dnd";

interface DragItemType {
  index: number;
  id: number;
  type: string;
  dropType: "sort" | "addToGroup" | "none";
}

function useSortDropItem({ moveCard, id, sortIndex, type }) {
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
      const droppedOntoSelf = item.id === id;
      if (droppedOntoSelf) return;
      if (item.dropType === "sort") {
        const dragIndex = item.index;
        moveCard(dragIndex, sortIndex);
      }
    },
    canDrop: (item) => item.id !== id,
    hover(item: DragItemType) {
      item.dropType = "sort";
    },
  });

  const isSortDropActive = canDrop_2 && isOver_2;
  return {
    sortRef: sortDropRef,
    isSortDropActive,
  };
}

export default useSortDropItem;
