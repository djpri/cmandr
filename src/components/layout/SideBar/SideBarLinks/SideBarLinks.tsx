import { Box, HStack, Link, Stack, StackDivider, Text } from "@chakra-ui/react";
import useCommandCategories from "hooks/commands/useCommandCategories";
import useLinkCategories from "hooks/links/useLinkCategories";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiFillWallet, AiOutlineWallet } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import CategoriesList from "./CategoriesList/CategoriesList";

function SideBarLinks() {
  const [currentSelectedId, setCurrentSelectedId] = useState("");
  const displayChildren = useRef({});
  const [popup, setPopup] = useState({});

  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (
        !(event.target as HTMLElement).classList.contains(currentSelectedId)
      ) {
        setPopup({});
      }
    },
    [currentSelectedId]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  const CommandCategoryLinks = () => {
    const { query: allCategoriesQuery } = useCommandCategories();

    return (
      <CategoriesList
        isIdle={allCategoriesQuery.isIdle}
        isLoading={allCategoriesQuery.isLoading}
        categories={allCategoriesQuery.data}
        currentSelectedId={currentSelectedId}
        setCurrentSelectedId={setCurrentSelectedId}
        popup={popup}
        setPopup={setPopup}
        displayChildren={displayChildren}
      />
    );
  };

  const LinkCategoryLinks = () => {
    const { query: allCategoriesQuery } = useLinkCategories();

    return (
      <CategoriesList
        isIdle={allCategoriesQuery.isIdle}
        isLoading={allCategoriesQuery.isLoading}
        categories={allCategoriesQuery.data}
        currentSelectedId={currentSelectedId}
        setCurrentSelectedId={setCurrentSelectedId}
        popup={popup}
        setPopup={setPopup}
        displayChildren={displayChildren}
      />
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
          <HStack>
            <AiFillWallet />
            <Text>All commands</Text>
          </HStack>
        </Link>

        <Link as={RouterLink} to="/commands">
          <HStack>
            <AiOutlineWallet color="gray.200" />
            <Text>Unsorted</Text>
          </HStack>
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
          <HStack>
            <AiFillWallet />
            <Text>All links</Text>
          </HStack>
        </Link>

        <Link as={RouterLink} to="/links">
          <HStack>
            <AiOutlineWallet color="gray.200" />
            <Text>Unsorted</Text>
          </HStack>
        </Link>

        <LinkCategoryLinks />
      </Stack>
    </Stack>
  );
}

export default SideBarLinks;
