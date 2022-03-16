import {
  Box,
  HStack,
  Link,
  Spinner,
  Stack,
  StackDivider,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import useCommandCategories from "hooks/useCommandCategories";
import useLinkCategories from "hooks/useLinkCategories";
import { CommandCategory, LinkCategory } from "models/category";
import * as React from "react";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AddCommandCategory from "../../../commandCategories/AddCommandCategory/AddCommandCategory";
import AddLinkCategory from "../../../linkCategories/AddLinkCategory/AddLinkCategory";

function SideBarLinks() {
  const location = useLocation();

  const CommandCategoryLinks = () => {
    const { query: allCategoriesQuery } = useCommandCategories();

    if (allCategoriesQuery.isLoading) return <Spinner />;

    return (
      <>
        {allCategoriesQuery.data &&
          allCategoriesQuery.data.map((item: CommandCategory) => (
            <HStack key={item.id}>
              {location.pathname === `/commands/${item.id}` ? (
                <AiFillFolderOpen />
              ) : (
                <AiFillFolder />
              )}
              <Tooltip label={item.name} placement="right" openDelay={500}>
                <Link as={RouterLink} to={`/commands/${item.id}`}>
                  {item.name.substring(0, 15)}
                  {item.name.length > 15 && "..."}
                </Link>
              </Tooltip>
              {item.items ? (
                <Text color="gray.500" fontWeight="700">
                  {item.items}
                </Text>
              ) : (
                <Text color="gray.500" fontWeight="700">
                  0
                </Text>
              )}
            </HStack>
          ))}
        <AddCommandCategory />
      </>
    );
  };

  const LinkCategoryLinks = () => {
    const { query: allCategoriesQuery } = useLinkCategories();

    if (allCategoriesQuery.isLoading) return <Spinner />;

    return (
      <>
        {allCategoriesQuery.data &&
          allCategoriesQuery?.data.map((item: LinkCategory) => (
            <HStack key={item.id}>
              {location.pathname === `/links/${item.id}` ? (
                <AiFillFolderOpen />
              ) : (
                <AiFillFolder />
              )}
              <Tooltip label={item.name} placement="right" openDelay={500}>
                <Link as={RouterLink} to={`/links/${item.id}`}>
                  {item.name.substring(0, 15)}
                  {item.name.length > 15 && "..."}
                </Link>
              </Tooltip>
              {item.items ? (
                <Text color="gray.500" fontWeight="700">
                  {item.items}
                </Text>
              ) : (
                <Text color="gray.500" fontWeight="700">
                  0
                </Text>
              )}
            </HStack>
          ))}
        <AddLinkCategory />
      </>
    );
  };

  return (
    <Stack divider={<StackDivider borderColor="gray.500" />} pl="6" pr="5">
      <Stack>
        {/* MENU */}
        <Box flex="1" textAlign="left">
          <Text fontFamily="Lato" fontWeight="700" letterSpacing="1px">
            <Link as={RouterLink} to="/">
              Home
            </Link>
          </Text>
        </Box>
      </Stack>

      {/* COMMANDS */}
      <Stack>
        <Box flex="1" textAlign="left">
          <Text fontFamily="Lato" fontWeight="700" letterSpacing="1px">
            Commands
          </Text>
        </Box>

        <Link as={RouterLink} to="/commands">
          <Text>All commands</Text>
        </Link>
        <CommandCategoryLinks />
      </Stack>

      {/* LINKS */}
      <Stack mb="100px">
        <Box flex="1" textAlign="left">
          <Text fontFamily="Lato" fontWeight="700" letterSpacing="1px">
            Links
          </Text>
        </Box>

        <Link as={RouterLink} to="/links">
          <Text>All links</Text>
        </Link>

        <LinkCategoryLinks />
      </Stack>
    </Stack>
  );
}

export default SideBarLinks;
