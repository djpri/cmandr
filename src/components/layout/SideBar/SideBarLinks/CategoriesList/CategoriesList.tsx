import { Box, HStack, Link, Spinner, Text, Tooltip } from "@chakra-ui/react";
import AddLinkCategory from "components/linkCategories/AddLinkCategory/AddLinkCategory";
import { CategoryReadDto } from "models/category";
import { MutableRefObject, useEffect, useMemo, useState } from "react";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface IProps {
  categories: CategoryReadDto[];
  isIdle: boolean;
  isLoading: boolean;
  currentSelectedId: string;
  setCurrentSelectedId: (id: string) => void;
  popup: object;
  setPopup: (popup: object) => void;
  displayChildren: MutableRefObject<object>;
}

function CategoriesList({
  categories,
  isIdle,
  isLoading,
  currentSelectedId,
  setCurrentSelectedId,
  popup,
  setPopup,
  displayChildren,
}: IProps) {
  const location = useLocation();
  const [style, setStyle] = useState(null);

  if (isIdle) return null;
  if (isLoading) return <Spinner />;
  if (!categories) return null;

  const topLevelCategories = categories.filter((item) => item.parentId === 0);

  const getChildren = (category) => {
    return categories.filter((item) => item.parentId === category.id);
  };

  const CategoryInfo = ({ item, isChild, depth }) => {
    const hasChildren = useMemo(() => getChildren(item).length > 0, [item]);

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();

      setPopup({ [item.id]: true });
      setCurrentSelectedId(`category-${item.id}`);

      const popup = document.getElementById(`popup-${item.id}`);

      const clickX = event.clientX;
      const clickY = event.clientY;

      popup.style.left = `${clickX}px`;
      popup.style.top = `${clickY}px`;

      setStyle({
        position: "fixed",
        left: `${clickX}px`,
        top: `${clickY}px`,
      });
    };

    useEffect(() => {
      const el = document.getElementById(`category-${item.id}`);

      el.addEventListener("contextmenu", handleContextMenu);

      return () => {
        el.removeEventListener("contextmenu", handleContextMenu);
      };
    }, [item.id]);

    const handleOpen = () => {
      displayChildren.current = {
        ...displayChildren.current,
        [item.id]: true,
      };
    };
    const handleClose = () => {
      displayChildren.current = {
        ...displayChildren.current,
        [item.id]: false,
      };
    };

    return (
      <>
        <HStack
          position="relative"
          key={item.id}
          id={`category-${item.id}`}
          width="100%"
          pl={isChild && 15 * depth}
          className={`category-${item.id}`}
          sx={style}
        >
          {/* OPEN CLOSE FOLDER BUTTON */}
          {hasChildren && (
            <Box
              position="absolute"
              m="0px"
              p="0px"
              left="-15px"
              cursor="pointer"
              aria-label={"open-folder"}
              onClick={
                displayChildren.current[item.id] === true
                  ? handleClose
                  : handleOpen
              }
            >
              {displayChildren.current[item.id] === true ? (
                <IoMdArrowDropdown />
              ) : (
                <IoMdArrowDropright />
              )}
            </Box>
          )}

          {location.pathname === `/links/${item.id}` ? (
            <AiFillFolderOpen />
          ) : (
            <AiFillFolder color={isChild ? "gray" : "white"} />
          )}

          <Tooltip label={item.name} placement="right" openDelay={500}>
            <Link as={RouterLink} to={`/links/${item.id}`} userSelect="none">
              {item.name.substring(0, 15)}
              {item.name.length > 15 && "..."}
            </Link>
          </Tooltip>
          {item.items ? (
            <>
              <Text
                color={`hsl(144, ${
                  (item.items / categories.length) * 100 + 40
                }%, 35%)`}
                fontWeight="700"
                userSelect="none"
              >
                {item.items}
              </Text>
            </>
          ) : (
            <Text color="gray.500" fontWeight="700" userSelect="none">
              0
            </Text>
          )}
        </HStack>
        {getChildren(item).length > 0 &&
          displayChildren.current[item.id] &&
          depth < 4 &&
          getChildren(item).map((child) => (
            <CategoryInfo
              key={item.id}
              item={child}
              isChild={true}
              depth={depth + 1}
            />
          ))}
        {popup[item.id] && (
          <Box
            position="fixed"
            w="80px"
            zIndex={1000}
            right="0"
            bgColor="black"
            className={currentSelectedId}
            id={`popup-${item.id}`}
            sx={style}
            m="0"
            p="0"
          >
            Popup
          </Box>
        )}
      </>
    );
  };

  return (
    <>
      {topLevelCategories.map((item: CategoryReadDto) => (
        <CategoryInfo key={item.id} item={item} isChild={false} depth={0} />
      ))}
      <AddLinkCategory />
    </>
  );
}

export default CategoriesList;
