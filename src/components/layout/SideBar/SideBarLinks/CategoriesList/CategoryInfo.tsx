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
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  selectOpenCategories,
  setCategoryClose,
  setCategoryOpen,
} from "redux/slices/layoutSlice";

interface IProps {
  item: CategoryReadDto;
  isChild: boolean;
  depth: number;
  type: string;
  categories: CategoryReadDto[];
}

const CategoryInfo: FC<IProps> = ({
  item,
  isChild,
  depth,
  type,
  categories,
}) => {
  const location = useLocation();
  const folderColor = useColorModeValue("gray.900", "gray.300");
  const openCategories = useSelector(selectOpenCategories);
  const dispatch = useDispatch();

  const childCategories = useMemo(() => {
    return categories.filter((cat) => cat.parentId === item.id);
  }, [categories, item.id]);

  const hasChildren = useMemo(
    () => childCategories?.length > 0,
    [childCategories]
  );

  const handleOpen = () => {
    dispatch(setCategoryOpen(item.id));
  };
  const handleClose = () => {
    dispatch(setCategoryClose(item.id));
  };

  const OpenCloseFolderButton: FC = () => (
    <Center
      h="100%"
      cursor="pointer"
      position="absolute"
      left="-1rem"
      aria-label="open-folder"
      onClick={openCategories[item.id] ? handleClose : handleOpen}
      visibility={hasChildren ? "visible" : "hidden"}
      _hover={{ bgColor: "blue.500" }}
      rounded="sm"
      pr="1rem"
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
      return <AiFillFolderOpen color={isChild ? "gray" : folderColor} />;
    } else {
      return <AiFillFolder color={isChild ? "gray" : folderColor} />;
    }
  };

  const Name: FC = () => (
    <Tooltip label={item.name} placement="right" openDelay={500}>
      <Link
        fontWeight="500"
        textAlign="left"
        maxWidth="60%"
        overflow="hidden"
        textOverflow="ellipsis"
        display="inline"
        whiteSpace="nowrap"
        as={RouterLink}
        to={`/${type}/${item.id}`}
      >
        {item.name}
      </Link>
    </Tooltip>
  );

  const Count: FC = () => (
    <Text
      color={`hsl(180, ${(item.items / categories.length) * 100 + 40}%, 35%)`}
      fontWeight="700"
    >
      {item.items}
    </Text>
  );

  return (
    <AccordionItem border="none" _hover={{ cursor: "default" }}>
      <Box
        p="8px 24px"
        mr="5px"
        position="relative"
        _hover={{ cursor: "default" }}
      >
        <HStack
          position="relative"
          key={item.id}
          id={`category-${item.id}`}
          width="100%"
          pl={isChild && 2 + depth}
          className={`sidebar-category category-${item.id}`}
        >
          <Box position="relative">
            <OpenCloseFolderButton />
            <Folder />
          </Box>
          <Name />
          {item.items && <Count />}
        </HStack>
      </Box>
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
          />
        ))}
    </AccordionItem>
  );
};

export default CategoryInfo;
