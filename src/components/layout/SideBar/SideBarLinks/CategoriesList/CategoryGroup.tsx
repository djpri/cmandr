import {
  AccordionItem,
  Box,
  Center,
  HStack,
  Link,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { CategoryReadDto } from "models/category";
import { FC, useMemo } from "react";
import { AiFillFolder } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  selectOpenCategories,
  setCategoryClose,
  setCategoryOpen,
} from "redux/slices/layoutSlice";
import CategoryInfo from "./CategoryInfo";

interface IProps {
  item: CategoryReadDto;
  isChild: boolean;
  depth: number;
  type: string;
  categories: CategoryReadDto[];
  dragDropRef: React.MutableRefObject<HTMLDivElement>;
}

const CategoryGroup: FC<IProps> = ({
  item,
  isChild,
  depth,
  type,
  categories,
  dragDropRef,
}) => {
  const dispatch = useDispatch();
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
      // position="absolute"
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
        fontWeight="500"
        textAlign="left"
        maxWidth="60%"
        overflow="hidden"
        textOverflow="ellipsis"
        display="inline"
        whiteSpace="nowrap"
      >
        {item.name}
      </Text>
    </Tooltip>
  );

  const Count: FC = () => (
    <Text color={`hsl(0, 70%, 55%)`} fontWeight="700">
      {childCategories?.length}
    </Text>
  );

  return (
    <Box _hover={{ textDecoration: "none" }}>
      <AccordionItem
        border="none"
        _hover={{ cursor: "default", backgroundColor: bgColor }}
      >
        <Box p="8px 24px" mr="5px" position="relative" ref={dragDropRef}>
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
        childCategories.map((child) => (
          <CategoryInfo
            key={item.id.toString()}
            item={child}
            type={type}
            isChild={true}
            depth={depth + 1}
            categories={categories}
            dragDropRef={null}
          />
        ))}
    </Box>
  );
};

export default CategoryGroup;
