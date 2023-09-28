import { GridItem, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { CategoryReadDto } from "models/category";
import { Entity } from "models/entity";
import { AiFillFolder, AiOutlineUnorderedList } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { entityRoute } from "routes";

interface CategoryLinkButtonProps {
  item: CategoryReadDto;
  routeType: entityRoute;
  entityType: Entity;
  hue: number;
}

// TODO: Add more interesting styling

function CategoryLinkButton({
  item,
  routeType: type,
  entityType,
  hue,
}: CategoryLinkButtonProps) {
  const itemCountColor = useColorModeValue("gray.600", "gray.300");

  const buttonBgGradient = useColorModeValue(
    `linear-gradient(135deg, hsl(${hue + 3}, 20%, 80%), hsla(${
      hue + 3
    }, 80%, 40%, 0.2))`,
    `linear-gradient(45deg, hsl(${hue}, 30%, 40%), transparent)`
  );

  const bgPositionEnd = useColorModeValue("100%", "0%");

  const buttonBgGradientHover = useColorModeValue(
    `linear-gradient(135deg, hsl(${hue + 3}, 70%, 90%), hsla(${
      hue + 3
    }, 80%, 80%, 0.5))`,
    `linear-gradient(135deg, hsl(${hue + 3}, 60%, 50%), transparent)`
  );
  return (
    <GridItem
      as={RouterLink}
      to={`/${type}/${item.id}`}
      boxShadow="0 1px 0px 0 rgba(0, 0, 0, 0.1),0 2px 5px 0 rgb(199 199 199 / 30%)"
      p="5px 10px"
      rounded="md"
      textAlign="left"
      bgImage={buttonBgGradient}
      transition="all 0.16s cubic-bezier( 0.02, 0.43, 0.88, 0.76 )"
      bgPosition="75%"
      bgSize="300%"
      _hover={{
        bgImage: buttonBgGradientHover,
        bgPosition: bgPositionEnd,
      }}
      fontSize="lg"
      fontWeight="bold"
    >
      <HStack>
        {item?.isGroup ? <AiFillFolder /> : <AiOutlineUnorderedList />}
        <Text data-cy={`category-link-button ${entityType} name`}>
          {item.name}
        </Text>
      </HStack>
      <Text fontSize="sm">
        <Text as="span" color={itemCountColor} fontWeight="700">
          {item?.items}{" "}
          {item.isGroup
            ? ` categor${item.items === 1 ? "y" : "ies"}`
            : ` item${item.items === 1 ? "" : "s"}`}
        </Text>
      </Text>
    </GridItem>
  );
}

export default CategoryLinkButton;
