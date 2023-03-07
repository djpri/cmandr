import { GridItem, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { AiFillFolder, AiOutlineUnorderedList } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

function CategoryLinkButton({ item, type, hue }) {
  const itemCountColor = useColorModeValue("gray.600", "gray.300");

  const buttonBgGradient = useColorModeValue(
    `linear-gradient(135deg, hsl(${hue + 3}, 50%, 80%), transparent)`,
    `linear-gradient(45deg, hsl(${hue}, 50%, 40%), transparent)`
  );

  const buttonBgGradientHover = useColorModeValue(
    `linear-gradient(135deg, hsl(${hue + 3}, 50%, 90%), transparent)`,
    `linear-gradient(135deg, hsl(${hue + 3}, 60%, 50%), transparent)`
  );
  return (
    <GridItem
      as={RouterLink}
      to={`/${type}/${item.id}`}
      boxShadow="base"
      p="5px 10px"
      rounded="sm"
      textAlign="left"
      bgImage={buttonBgGradient}
      transition="all 0.16s cubic-bezier( 0.02, 0.43, 0.88, 0.76 )"
      bgPosition="75%"
      bgSize="300%"
      _hover={{
        bgColor: buttonBgGradientHover,
        bgPosition: "0%",
      }}
      fontSize="lg"
      fontWeight="bold"
    >
      <HStack>
        {item?.isGroup ? <AiFillFolder /> : <AiOutlineUnorderedList />}
        <Text>{item.name}</Text>
      </HStack>
      <Text fontSize="sm">
        <Text as="span" color={itemCountColor} fontWeight="700">
          {item?.items} {item.isGroup ? ` categor${item.items === 1 ? "y" : "ies"}` : " items"}
        </Text>
      </Text>
    </GridItem>
  );
}

export default CategoryLinkButton;
