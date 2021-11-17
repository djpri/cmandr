import { Box, Link, Text, StackDivider, Stack, HStack } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import AddCommandCategory from "../../../components/commands/AddCommandCategory/AddCommandCategory";
import AddLinkCategory from "../../../components/links/AddLinkCategory/AddLinkCategory";
import { selectCategoriesWithIds } from "../../../redux/commands/commandsSlice";
import { selectLinkCategories } from "../../../redux/links/linksSlice";
import { CommandCategory } from "../../../types/types";

function SideBarLinks() {
  const commandCategories = useSelector(selectCategoriesWithIds);
  const linkCategories = useSelector(selectLinkCategories);
  return (
    <Stack divider={<StackDivider borderColor="gray.500" />} pl="6" pr="5">
      <Stack>
        {/* MENU */}
        <Box flex="1" textAlign="left">
          <Text fontWeight="700" letterSpacing="1px">
            <Link as={RouterLink} to="/">
              Home
            </Link>
          </Text>
        </Box>
      </Stack>

      {/* COMMANDS */}
      <Stack>
        <Box flex="1" textAlign="left">
          <Text fontWeight="700" letterSpacing="1px">
            Commands
          </Text>
        </Box>

        <Link as={RouterLink} to="/commands">
          <Text>All commands</Text>
        </Link>
        {commandCategories &&
          commandCategories.map((item: CommandCategory) => (
            <HStack key={item.id}>
              <Link as={RouterLink} to={`/commands/${item.id}`}>
                {item.name}
              </Link>
            </HStack>
          ))}
        <AddCommandCategory />
      </Stack>

      {/* COMMANDS */}
      <Stack>
        <Box flex="1" textAlign="left">
          <Text fontWeight="700" letterSpacing="1px">
            Links
          </Text>
        </Box>

        <Link as={RouterLink} to="/links">
          <Text>All links</Text>
        </Link>

        {linkCategories &&
          linkCategories.map((item: CommandCategory) => (
            <HStack key={item.id}>
              <Link as={RouterLink} to={`/links/${item.id}`}>
                {item.name}
              </Link>
            </HStack>
          ))}
        <AddLinkCategory />
      </Stack>
    </Stack>
  );
}

export default SideBarLinks;
