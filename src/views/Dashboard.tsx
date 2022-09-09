import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useCommandCategories from "hooks/commands/useCommandCategories";
import useLinkCategories from "hooks/links/useLinkCategories";
import { Link as RouterLink } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";

function Dashboard() {
  const { query: commandCategoryQuery } = useCommandCategories();
  const { query: linkCategoryQuery } = useLinkCategories();

  const itemCountColor = useColorModeValue("gray.600", "gray.300");

  const hue = 194;
  const buttonBgGradient = useColorModeValue(
    `linear-gradient(-45deg, hsl(${hue}, 45%, 90%), transparent)`,
    `linear-gradient(45deg, hsl(${hue}, 50%, 40%), transparent)`
  );

  const buttonBgGradientHover = useColorModeValue(
    `linear-gradient(-135deg, hsl(${hue + 3}, 45%, 80%), transparent)`,
    `linear-gradient(135deg, hsl(${hue + 3}, 60%, 50%), transparent)`
  );

  const StyledButton = ({ item, children }) => (
    <GridItem
      as={RouterLink}
      to={`/commands/${item.id}`}
      boxShadow="base"
      p="5px 10px"
      rounded="sm"
      textAlign="left"
      // bgColor={linkBgColor}
      bgImage={buttonBgGradient}
      transition="all 0.3s cubic-bezier( 0.02, 0.43, 0.88, 0.76 )"
      bgPosition="75%"
      bgSize="300%"
      _hover={{
        bgImage: buttonBgGradientHover,
        bgPosition: "0%",
      }}
      fontFamily="Lato"
      fontSize="lg"
      fontWeight="bold"
    >
      {children}
    </GridItem>
  );

  return (
    <UserLayout>
      <Box fontSize="xl">
        <Heading as="h1">Commands</Heading>
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {commandCategoryQuery?.data?.length >= 1 &&
            commandCategoryQuery.data.map((item) => (
              <StyledButton key={item.id} item={item}>
                <Text>{item.name}</Text>
                <Text fontSize="sm">
                  <Text as="span" color={itemCountColor} fontWeight="700">
                    {item?.items} items
                  </Text>
                </Text>
              </StyledButton>
            ))}
        </Grid>
        <Heading as="h1">Links</Heading>
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {linkCategoryQuery?.data?.length >= 1 &&
            linkCategoryQuery.data.map((item) => (
              <StyledButton key={item.id} item={item}>
                <Text>{item.name}</Text>
                <Text fontSize="sm">
                  <Text as="span" color={itemCountColor} fontWeight="700">
                    {item?.items} items
                  </Text>
                </Text>
              </StyledButton>
            ))}
        </Grid>
      </Box>
    </UserLayout>
  );
}

export default Dashboard;
