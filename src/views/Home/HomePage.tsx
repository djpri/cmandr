import {
  Box,
  Grid,
  Heading,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import UserLayout from "../../layout/UserLayout";
import { selectCategoriesWithIds } from "../../redux/commands/commandsSlice";
import { selectLinkCategories } from "../../redux/links/linksSlice";
import { Link as RouterLink } from "react-router-dom";

function HomePage() {
  const commandCategories = useSelector(selectCategoriesWithIds);
  const linkCategories = useSelector(selectLinkCategories);
  const linkBgColor = useColorModeValue("green.50", "teal.900");
  const linkBgHoverColor = useColorModeValue("green.100", "teal.600");

  return (
    <UserLayout>
      <Box fontSize="xl">
        <Heading as="h1">Commands</Heading>
        <Grid my="30px" gap={3} templateColumns="repeat(6, 1fr)">
          {commandCategories.map((item) => (
            <GridItem
              as={RouterLink}
              to={`/commands/${item.id}`}
              boxShadow="base"
              p="5px 10px"
              rounded="md"
              textAlign="left"
              bgColor={linkBgColor}
              _hover={{
                bgColor: linkBgHoverColor,
              }}
              fontFamily="Lato"
              fontSize="lg"
              fontWeight="bold"
              transition="0.1s"
            >
              {item.name}
            </GridItem>
          ))}
        </Grid>
        <Heading as="h1">Links</Heading>
        <Grid my="30px" gap={3} templateColumns="repeat(6, 1fr)">
          {linkCategories.map((item) => (
            <GridItem
              as={RouterLink}
              to={`/commands/${item.id}`}
              boxShadow="base"
              p="5px 10px"
              rounded="md"
              textAlign="left"
              bgColor={linkBgColor}
              _hover={{
                bgColor: linkBgHoverColor,
              }}
              fontFamily="Lato"
              fontSize="lg"
              fontWeight="bold"
              transition="0.1s"
            >
              {item.name}
            </GridItem>
          ))}
        </Grid>
      </Box>
    </UserLayout>
  );
}

export default HomePage;
