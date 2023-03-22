import {
  AccordionItem,
  Box,
  Center,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { isInDevelopment } from "helpers/environment";
import { CategoryReadDto } from "models/category";
import { FC, useMemo } from "react";
import { AiFillFolder } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectOpenCategories,
  setCategoryClose,
  setCategoryOpen,
} from "redux/slices/layoutSlice";
import DragItem from "./DnD/DragItem";

interface IProps {
  item: CategoryReadDto;
  isChild: boolean;
  depth: number;
  type: string;
  categories: CategoryReadDto[];
  dragDropRef: React.MutableRefObject<HTMLDivElement>;
  handleAddCategoryToGroup: (
    categoryIdToAdd: number,
    targetGroupId: number
  ) => void;
}

const CategoryGroup: FC<IProps> = ({
  item,
  isChild,
  depth,
  type,
  categories,
  dragDropRef,
  handleAddCategoryToGroup,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const folderColor = useColorModeValue("gray.900", "gray.300");
  const bgColor = useColorModeValue("whiteAlpha.600", "whiteAlpha.200");

  const openCategories = useSelector(selectOpenCategories);

  const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setCategoryOpen(item.id));
  };
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setCategoryClose(item.id));
  };

  const childCategories = useMemo(() => {
    return categories.filter((cat) => cat.parentId === item.id);
  }, [categories, item.id]);

  const hasChildren = useMemo(
    () => childCategories?.length > 0,
    [childCategories]
  );

  const OpenCloseFolderButton: FC = () => (
    <Center
      h="100%"
      cursor="pointer"
      left="-1rem"
      aria-label="open-folder"
      onClick={
        openCategories[item.id] ? (e) => handleClose(e) : (e) => handleOpen(e)
      }
      visibility={"visible"}
      _hover={{ bgColor: "hsl(0, 70%, 55%)" }}
      rounded="sm"
    >
      {openCategories[item.id] ? (
        <IoMdArrowDropdown style={{ marginLeft: "-4px" }} size="1.3rem" />
      ) : (
        <IoMdArrowDropright style={{ marginLeft: "-4px" }} size="1.3rem" />
      )}
    </Center>
  );

  const Folder: FC = () => {
    if (location.pathname === `/${type}/${item.id}`) {
      return (
        <AiFillFolder color={isChild ? "hsl(0, 70%, 55%)" : folderColor} />
      );
    } else {
      return (
        <AiFillFolder color={isChild ? "hsl(0, 70%, 55%)" : folderColor} />
      );
    }
  };

  const Name: FC = () => (
    <Tooltip label={item.name} placement="right" openDelay={500}>
      <Text
        textAlign="left"
        maxWidth="90%"
        overflow="hidden"
        textOverflow="ellipsis"
        display="inline"
        whiteSpace="nowrap"
        fontSize="sm"
      >
        {isInDevelopment && `(${item.id})`} {item.name}
      </Text>
    </Tooltip>
  );

  const Count: FC = () => (
    <Text color={`hsl(0, 70%, 55%)`} fontWeight="700">
      {childCategories?.length}
    </Text>
  );

  return (
    <Box _hover={{ textDecoration: "none" }} onClick={() => navigate(`/${type}/${item.id}`)}>
      <AccordionItem
        border="none"
        _hover={{ backgroundColor: bgColor, cursor: "pointer" }}
        mb={openCategories[item.id] && 2}
      >
        <Box p="4px 24px" mr="5px" position="relative" ref={dragDropRef}>
          <HStack
            position="relative"
            key={item.id}
            id={`category-${item.id}`}
            width="100%"
            pl={isChild && 2 + depth}
            className={`sidebar-category category-${item.id}`}
          >
            <OpenCloseFolderButton />
            <Folder />
            <Name />
            <Count />
          </HStack>
        </Box>
      </AccordionItem>
      {hasChildren &&
        openCategories[item.id] &&
        depth < 4 &&
        childCategories.map((child: CategoryReadDto, index: number) => (
          <DragItem
            key={child.id}
            item={child}
            isChild={true}
            depth={depth + 1}
            type={type}
            categories={categories}
            sortIndex={index}
            handleAddCategoryToGroup={handleAddCategoryToGroup}
          />
        ))}
    </Box>
  );
};

export default CategoryGroup;
