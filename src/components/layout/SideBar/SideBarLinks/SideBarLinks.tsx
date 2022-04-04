import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Text,
} from "@chakra-ui/react";
import useCommandCategories from "hooks/commands/useCommandCategories";
import useLinkCategories from "hooks/links/useLinkCategories";
import { AiFillWallet, AiOutlineWallet } from "react-icons/ai";
import { BiCommand } from "react-icons/bi";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";
import CategoriesList from "./CategoriesList/CategoriesList";

function SideBarLinks() {
  const textMargin = "8px";

  const CommandCategoryLinks = () => {
    const { query: allCategoriesQuery } = useCommandCategories();

    return (
      <CategoriesList
        type="commands"
        isIdle={allCategoriesQuery.isIdle}
        isError={allCategoriesQuery.isError}
        isLoading={allCategoriesQuery.isLoading}
        categories={allCategoriesQuery.data}
      />
    );
  };

  const LinkCategoryLinks = () => {
    const { query: allCategoriesQuery } = useLinkCategories();

    return (
      <CategoriesList
        type="links"
        isIdle={allCategoriesQuery.isIdle}
        isError={allCategoriesQuery.isError}
        isLoading={allCategoriesQuery.isLoading}
        categories={allCategoriesQuery.data}
      />
    );
  };

  return (
    <Accordion allowMultiple defaultIndex={[2, 5]}>
      {/* MENU */}
      <AccordionItem textAlign="left" as={RouterLink} to="/" borderTop="none">
        <AccordionButton fontFamily="Lato" fontWeight="700" letterSpacing="1px">
          <IoMdHome />
          <Text ml={textMargin}>Home</Text>
        </AccordionButton>
      </AccordionItem>

      <AccordionItem
        textAlign="left"
        as={RouterLink}
        to="/dashboard"
        borderTop="none"
      >
        <AccordionButton fontFamily="Lato" fontWeight="700" letterSpacing="1px">
          <IoMdHome />
          <Text ml={textMargin}>Dashboard</Text>
        </AccordionButton>
      </AccordionItem>

      {/* COMMANDS */}
      <AccordionItem>
        <AccordionButton textAlign="left">
          <BiCommand color="white" />
          <Text
            flex="1"
            fontFamily="Lato"
            fontWeight="700"
            letterSpacing="1px"
            ml={textMargin}
          >
            Commands
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <AccordionItem as={RouterLink} to="/commands">
            <AccordionButton>
              <HStack>
                <AiFillWallet />
                <Text fontWeight="500">All commands</Text>
              </HStack>
            </AccordionButton>
          </AccordionItem>
          <AccordionItem as={RouterLink} to="/commands">
            <AccordionButton>
              <HStack>
                <AiOutlineWallet color="gray.200" />
                <Text fontWeight="500">Unsorted</Text>
              </HStack>
            </AccordionButton>
          </AccordionItem>
          <CommandCategoryLinks />
        </AccordionPanel>
      </AccordionItem>

      {/* LINKS */}
      <AccordionItem>
        <AccordionButton textAlign="left">
          <FaExternalLinkSquareAlt />

          <Text
            flex="1"
            fontFamily="Lato"
            fontWeight="700"
            letterSpacing="1px"
            ml={textMargin}
          >
            Links
          </Text>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel>
          <AccordionItem as={RouterLink} to="/links">
            <AccordionButton>
              <HStack>
                <AiFillWallet />
                <Text fontWeight="500">All links</Text>
              </HStack>
            </AccordionButton>
          </AccordionItem>
          <AccordionItem as={RouterLink} to="/links">
            <AccordionButton>
              <HStack>
                <AiOutlineWallet color="gray.200" />
                <Text fontWeight="500">Unsorted</Text>
              </HStack>
            </AccordionButton>
          </AccordionItem>
          <LinkCategoryLinks />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default SideBarLinks;
