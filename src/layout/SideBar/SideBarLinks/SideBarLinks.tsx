import { Box, Link, Text, StackDivider, Stack, HStack } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import AddCommandCategory from "../../../components/AddCommandCategory/AddCommandCategory";
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
            Menu
          </Text>
        </Box>
        <Link as={RouterLink} to="/">
          Home
        </Link>
        <Link as={RouterLink} to="/dashboard">
          Dashboard
        </Link>
        <Link as={RouterLink} to="/manage-commands">
          Command manager
        </Link>
        <Link as={RouterLink} to="/manage-commands">
          Settings
        </Link>
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
      </Stack>
    </Stack>
  );
}

export default SideBarLinks;
