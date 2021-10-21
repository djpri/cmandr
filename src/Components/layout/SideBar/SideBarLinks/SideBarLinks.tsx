import { Box, Link, Text, StackDivider, Stack } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { selectAllCategories } from "../../../../redux/commands/commandsSlice";
import { slugify } from "../../../../utils/slugify";
import AddCommandCategory from "../../../shared/AddCommandCategory/AddCommandCategory";

function SideBarLinks() {
  const commandCategories = useSelector(selectAllCategories);
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
          commandCategories.map((item: string, index: number) => (
            <React.Fragment key={index}>
              <Link as={RouterLink} to={`/commands/${slugify(item)}`}>
                {item}
              </Link>
            </React.Fragment>
          ))}
        <AddCommandCategory />
      </Stack>
    </Stack>
  );
}

export default SideBarLinks;
