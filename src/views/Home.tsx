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

function HomePage() {
  const { query: commandCategoryQuery } = useCommandCategories();
  const { query: linkCategoryQuery } = useLinkCategories();

  const linkBgColor = useColorModeValue("blue.50", "teal.900");
  const linkBgHoverColor = useColorModeValue("blue.100", "teal.600");

  return (
    <UserLayout>
      <Box fontSize="xl">
        <Heading as="h1">Commands</Heading>
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {commandCategoryQuery?.data?.length >= 1 &&
            commandCategoryQuery.data.map((item) => (
              <GridItem
                key={item.id}
                as={RouterLink}
                to={`/commands/${item.id}`}
                boxShadow="base"
                p="5px 10px"
                rounded="sm"
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
                <Text>{item.name}</Text>
                <Text fontSize="sm">
                  <Text as="span" color="gray.500" fontWeight="700">
                    {item?.items} items
                  </Text>
                </Text>
              </GridItem>
            ))}
        </Grid>
        <Heading as="h1">Links</Heading>
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {linkCategoryQuery?.data?.length >= 1 &&
            linkCategoryQuery.data.map((item) => (
              <GridItem
                key={item.id}
                as={RouterLink}
                to={`/links/${item.id}`}
                boxShadow="base"
                p="5px 10px"
                rounded="sm"
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
                <Text>{item.name}</Text>
                <Text fontSize="sm">
                  <Text as="span" color="gray.500" fontWeight="700">
                    {item?.items} items
                  </Text>
                </Text>
              </GridItem>
            ))}
        </Grid>
      </Box>
    </UserLayout>
  );
}

export default HomePage;
