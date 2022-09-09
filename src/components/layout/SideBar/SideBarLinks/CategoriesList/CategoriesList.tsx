import {
  AccordionItem,
  Box,
  Flex,
  HStack,
  Link,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import AddLinkCategory from "components/linkCategories/AddLinkCategory/AddLinkCategory";
import { CategoryReadDto } from "models/category";
import { useMemo } from "react";
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
  categories: CategoryReadDto[];
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  type: "commands" | "links";
}

function CategoriesList({
  categories,
  isIdle,
  isLoading,
  isError,
  type,
}: IProps) {
  const location = useLocation();
  const folderColor = useColorModeValue("gray.900", "gray.300");
  const openCategories = useSelector(selectOpenCategories);
  const dispatch = useDispatch();

  if (isIdle) return null;
  if (isLoading)
    return (
      <AccordionItem p="8px 24px" borderTop="none">
        <Spinner />
      </AccordionItem>
    );
  if (isError)
    return (
      <AccordionItem p="8px 24px" borderTop="none">
        Error: Could not load categories
      </AccordionItem>
    );
  if (!categories) return null;

  const topLevelCategories = categories.filter((item) => item.parentId === 0);

  const getChildren = (category) => {
    return categories.filter((item) => item.parentId === category.id);
  };

  const CategoryInfo = ({ item, isChild, depth, type }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hasChildren = useMemo(() => getChildren(item).length > 0, [item]);

    const handleOpen = () => {
      dispatch(setCategoryOpen(item.id));
    };
    const handleClose = () => {
      dispatch(setCategoryClose(item.id));
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const openCloseFolderButton = () => (
      <Box
        h="100%"
        cursor="pointer"
        aria-label={"open-folder"}
        onClick={openCategories[item.id] ? handleClose : handleOpen}
      >
        {openCategories[item.id] ? (
          <IoMdArrowDropdown style={{ marginLeft: "-4px" }} size="1.3rem" />
        ) : (
          <IoMdArrowDropright style={{ marginLeft: "-4px" }} size="1.3rem" />
        )}
      </Box>
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
            pl={isChild && 10 + 20 * depth}
            className={`sidebar-category category-${item.id}`}
          >
            {/* OPEN CLOSE FOLDER BUTTON */}
            {location.pathname === `/${type}/${item.id}` ? (
              <AiFillFolderOpen color={isChild ? "gray" : folderColor} />
            ) : (
              <AiFillFolder color={isChild ? "gray" : folderColor} />
            )}
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
            {item.items && (
              <>
                <Text
                  color={`hsl(180, ${
                    (item.items / categories.length) * 100 + 40
                  }%, 35%)`}
                  fontWeight="700"
                >
                  {item.items}
                </Text>
              </>
            )}
          </HStack>
        </Box>
        {getChildren(item).length > 0 &&
          openCategories[item.id] &&
          depth < 4 &&
          getChildren(item).map((child) => (
            <CategoryInfo
              key={item.id}
              item={child}
              type={type}
              isChild={true}
              depth={depth + 1}
            />
          ))}
      </AccordionItem>
    );
  };

  return (
    <>
      {topLevelCategories.map((item: CategoryReadDto) => (
        <CategoryInfo
          key={item.id}
          item={item}
          isChild={false}
          depth={0}
          type={type}
        />
      ))}
      <AccordionItem borderTop="none">
        <Flex pt="2" py="4" px="6" flexDirection="column">
          <AddLinkCategory />
        </Flex>
      </AccordionItem>
    </>
  );
}

export default CategoriesList;
