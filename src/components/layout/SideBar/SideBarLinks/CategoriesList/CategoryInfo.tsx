import {
  AccordionItem,
  Box,
  HStack,
  Link,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { CategoryReadDto } from "models/category";
import { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  item: CategoryReadDto;
  isChild: boolean;
  depth: number;
  type: string;
  categories: CategoryReadDto[];
  dragDropRef: React.MutableRefObject<HTMLDivElement>;
}

const CategoryInfo: FC<IProps> = ({
  item,
  isChild,
  depth,
  type,
  categories,
  dragDropRef,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const folderColor = useColorModeValue("gray.900", "gray.300");
  const bgColor = useColorModeValue("whiteAlpha.600", "whiteAlpha.200");
  const isCurrentCategory = location.pathname === `/${type}/${item.id}`;

  const Folder: FC = () => {
    if (isCurrentCategory) {
      return <AiOutlineUnorderedList color={folderColor} />;
    } else {
      return <AiOutlineUnorderedList color={folderColor} />;
    }
  };

  const Name: FC = () => (
    <Box
      fontWeight="500"
      textAlign="left"
      maxWidth="60%"
      overflow="hidden"
      textOverflow="ellipsis"
      display="inline"
      whiteSpace="nowrap"
    >
      {item.name}
    </Box>
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
    <Tooltip label={item.name} openDelay={500}>
      <Box
        _hover={{ textDecoration: "none" }}
        onClick={() => navigate(`/${type}/${item.id}`)}
      >
        <AccordionItem
          border="none"
          _hover={{ cursor: "pointer", backgroundColor: bgColor }}
          p="8px 24px"
          ref={dragDropRef}
        >
          <HStack
            position="relative"
            key={item.id}
            id={`category-${item.id}`}
            width="100%"
            pl={isChild && 5 + depth}
            className={`sidebar-category category-${item.id}`}
          >
            <Folder />
            <Name />
            {item.items && <Count />}
          </HStack>
        </AccordionItem>
      </Box>
    </Tooltip>
  );
};

export default CategoryInfo;
