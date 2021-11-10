import {
  Box,
  Link,
  Text,
  StackDivider,
  Stack,
  Button,
  HStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import AddCommandCategory from "../../../components/AddCommandCategory/AddCommandCategory";
import { selectCategoriesWithIds } from "../../../redux/commands/commandsSlice";
import { deleteCommandCategoryInDB } from "../../../services/commandCategories/deleteCommandCategoryInDB";
import { CommandCategory } from "../../../types/types";
import { slugify } from "../../../utils/slugify";

function SideBarLinks() {
  const commandCategories = useSelector(selectCategoriesWithIds);
  const dispatch = useDispatch();
  const history = useHistory();
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
              <Link as={RouterLink} to={`/commands/${slugify(item.name)}`}>
                {item.id}: {item.name}
              </Link>
              <Button
                size="xs"
                onClick={() => {
                  history.push("/commands");
                  dispatch(deleteCommandCategoryInDB(item.id));
                }}
              >
                del
              </Button>
            </HStack>
          ))}
        <AddCommandCategory />
      </Stack>
    </Stack>
  );
}

export default SideBarLinks;
