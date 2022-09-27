import { chakra } from "@chakra-ui/react";
import type { Identifier } from "dnd-core";
import { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";

export interface CardProps {
  id: number;
  index: number;
  type: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleDrop: () => void;
}

interface DragItemType {
  index: number;
  id: string;
  type: string;
}

export const DragItem: FC<CardProps> = ({
  id,
  index,
  type,
  moveCard,
  handleDrop,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItemType,
    void,
    { handlerId: Identifier | null }
  >({
    accept: type,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop() {
      handleDrop();
    },
    hover(item: DragItemType, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      const isHoveringOverSelf = dragIndex === hoverIndex;

      if (isHoveringOverSelf) return;

      const isDraggingDown = dragIndex < hoverIndex;
      const isDraggingUp = dragIndex > hoverIndex;

      const { top, height } = ref.current.getBoundingClientRect();

      const hoverUpperBound = height / 4;
      const hoverLowerBound = (height * 3) / 4;

      const clientOffset = monitor.getClientOffset();
      const pixelsFromTop: number = (clientOffset as XYCoord).y - top;

      // const inMiddleRange =
      //   pixelsFromTop > hoverLowerBound && pixelsFromTop < hoverLowerBound;

      // Only perform the move when the mouse has crossed half of the items height
      if (isDraggingDown && pixelsFromTop < hoverLowerBound) return;
      if (isDraggingUp && pixelsFromTop > hoverUpperBound) return;

      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));
  return (
    <chakra.div
      ref={ref}
      data-handler-id={handlerId}
      border={isDragging && "2px solid green"}
    >
      <chakra.div opacity={opacity}>{children}</chakra.div>
    </chakra.div>
  );
};
