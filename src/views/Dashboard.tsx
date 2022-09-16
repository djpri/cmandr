import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import useCommandCategories from "hooks/commands/useCommandCategories";
import useLinkCategories from "hooks/links/useLinkCategories";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";

type SortButtonProps = {
  type: "command" | "link";
};

function Dashboard() {
  const { query: commandCategoryQuery } = useCommandCategories();
  const { query: linkCategoryQuery } = useLinkCategories();

  const itemCountColor = useColorModeValue("gray.600", "gray.300");

  const baseHue = 184;

  const StyledButton = ({ item, type, hue, children }) => {
    const buttonBgGradient = useColorModeValue(
      `linear-gradient(45deg, hsl(${hue}, 45%, 80%), transparent)`,
      `linear-gradient(45deg, hsl(${hue}, 50%, 40%), transparent)`
    );

    const buttonBgGradientHover = useColorModeValue(
      `linear-gradient(135deg, hsl(${hue + 3}, 45%, 80%), transparent)`,
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
  };

  const SortButtons: FC<SortButtonProps> = ({ type }) => {
    return (
      <Wrap my={4}>
        <Button variant="options">Sort A-Z</Button>
        <Button variant="options">Sort Z-A</Button>
        <Button variant="options">Sort by size</Button>
      </Wrap>
    );
  };

  return (
    <UserLayout>
      <Box fontSize="xl">
        <Heading as="h1">Commands</Heading>
        <SortButtons type="command" />
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {commandCategoryQuery?.data?.length >= 1 &&
            commandCategoryQuery.data.map((item, index) => (
              <StyledButton
                type="commands"
                key={item.id}
                item={item}
                hue={baseHue + index}
              >
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
        <SortButtons type="link" />
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {linkCategoryQuery?.data?.length >= 1 &&
            linkCategoryQuery.data.map((item, index) => (
              <StyledButton
                type="links"
                key={item.id}
                item={item}
                hue={baseHue + index}
              >
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
