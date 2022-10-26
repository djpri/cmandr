import { chakra } from "@chakra-ui/react";
import { CategoryReadDto } from "models/category";
import { FC } from "react";
import CategoryGroup from "../CategoryGroup";
import CategoryInfo from "../CategoryInfo";
import useAddToCategoryDropItem from "./useAddToCategoryDropItem";

export interface CardProps {
  sortIndex: number;
  type: string;
  handleAddCategoryToGroup: (
    categoryIdToAdd: number,
    targetGroupId: number
  ) => void;
  isGroup?: boolean;
  item: CategoryReadDto;
  isChild?: boolean;
  depth: number;
  categories: CategoryReadDto[];
}

const DragItem: FC<CardProps> = (props) => {
  const {
    type,
    handleAddCategoryToGroup,
    isGroup,
    item: categoryItem,
    isChild,
    depth,
    categories,
  } = props;

  const { ref, isAddToGroupDropActive, dropType, drag, addToCategoryDropRef } =
    useAddToCategoryDropItem({
      type,
      isGroup,
      handleAddCategoryToGroup,
      id: categoryItem.id,
    });
  const categoryItemProps = {
    item: categoryItem,
    isChild,
    depth,
    type,
    categories,
    dragDropRef: ref,
  };

  drag(addToCategoryDropRef(ref));

  return (
    <chakra.div borderRadius={isGroup && "md"} pb="2">
      <chakra.div
        border={
          dropType === "addToGroup" && isAddToGroupDropActive && "2px solid red"
        }
      >
        {isGroup ? (
          <CategoryGroup
            {...categoryItemProps}
            handleAddCategoryToGroup={props.handleAddCategoryToGroup}
          />
        ) : (
          <CategoryInfo {...categoryItemProps} />
        )}
      </chakra.div>
    </chakra.div>
  );
};

export default DragItem;
