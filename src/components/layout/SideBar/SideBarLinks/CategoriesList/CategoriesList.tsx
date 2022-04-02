import {
  AccordionButton,
  AccordionItem,
  Box,
  Flex,
  HStack,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import AddLinkCategory from "components/linkCategories/AddLinkCategory/AddLinkCategory";
import { CategoryReadDto } from "models/category";
import { useMemo, useState } from "react";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface IProps {
  categories: CategoryReadDto[];
  isIdle: boolean;
  isLoading: boolean;
  type: "commands" | "links";
}

function CategoriesList({ categories, isIdle, isLoading, type }: IProps) {
  const location = useLocation();
  const folderColor = useColorModeValue("gray.900", "gray.300");

  if (isIdle) return null;
  if (isLoading) return <Spinner />;
  if (!categories) return null;

  const topLevelCategories = categories.filter((item) => item.parentId === 0);

  const getChildren = (category) => {
    return categories.filter((item) => item.parentId === category.id);
  };

  const CategoryInfo = ({ item, isChild, depth, type }) => {
    const [displayChildren, setDisplayChildren] = useState(false);
    const hasChildren = useMemo(() => getChildren(item).length > 0, [item]);

    const handleOpen = () => {
      setDisplayChildren(true);
    };
    const handleClose = () => {
      setDisplayChildren(false);
    };

    return (
      <AccordionItem border="none">
        <AccordionButton>
          <HStack
            position="relative"
            key={item.id}
            id={`category-${item.id}`}
            width="100%"
            pl={isChild && 15 * depth}
            className={`sidebar-category category-${item.id}`}
            as={RouterLink}
            to={`/${type}/${item.id}`}
          >
            {location.pathname === `/${type}/${item.id}` ? (
              <AiFillFolderOpen color={isChild ? "gray" : folderColor} />
            ) : (
              <AiFillFolder color={isChild ? "gray" : folderColor} />
            )}
            <Tooltip label={item.name} placement="right" openDelay={500}>
              <Text fontWeight="500">
                {item.name.substring(0, 15)}
                {item.name.length > 15 && "..."}
              </Text>
            </Tooltip>
            {item.items ? (
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
            ) : (
              <Text color="gray.500" fontWeight="700">
                0
              </Text>
            )}
          </HStack>
        </AccordionButton>
        {/* OPEN CLOSE FOLDER BUTTON */}
        {hasChildren && (
          <Box
            display="inline"
            position="relative"
            cursor="pointer"
            aria-label={"open-folder"}
            onClick={displayChildren ? handleClose : handleOpen}
          >
            {displayChildren ? (
              <IoMdArrowDropdown size="1.3rem" />
            ) : (
              <IoMdArrowDropright size="1.3rem" />
            )}
          </Box>
        )}
        {getChildren(item).length > 0 &&
          displayChildren &&
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
