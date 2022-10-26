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
import { AiFillWallet } from "react-icons/ai";
import { BiCommand } from "react-icons/bi";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";
import CategoriesList from "./CategoriesList/CategoriesList";
import useRemoveFromGroupDropItem from "./CategoriesList/DnD/useRemoveFromGroupDropItem";

function SideBarLinks() {
  const textMargin = "8px";

  const CommandCategorySection = () => {
    const { query, editCategoryMutation } = useCommandCategories();
    const { addToCategoryDropRef, isAddToGroupDropActive } =
      useRemoveFromGroupDropItem("commands", editCategoryMutation, query.data);
    return (
      <AccordionItem>
        <AccordionButton
          textAlign="left"
          ref={addToCategoryDropRef}
          border={isAddToGroupDropActive && "2px solid red"}
        >
          <BiCommand />
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
                <Text fontWeight="600">All commands</Text>
              </HStack>
            </AccordionButton>
          </AccordionItem>
          <CategoriesList
            type="commands"
            query={query}
            editCategoryMutation={editCategoryMutation}
          />
        </AccordionPanel>
      </AccordionItem>
    );
  };

  const LinkCategorySection = () => {
    const { query, editCategoryMutation } = useLinkCategories();
    const { addToCategoryDropRef, isAddToGroupDropActive } =
      useRemoveFromGroupDropItem("links", editCategoryMutation, query.data);

    return (
      <AccordionItem>
        <AccordionButton
          textAlign="left"
          ref={addToCategoryDropRef}
          border={isAddToGroupDropActive && "2px solid red"}
        >
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
                <Text fontWeight="600">All links</Text>
              </HStack>
            </AccordionButton>
          </AccordionItem>
          <CategoriesList
            type="links"
            query={query}
            editCategoryMutation={editCategoryMutation}
          />
        </AccordionPanel>
      </AccordionItem>
    );
  };

  return (
    <Accordion allowMultiple defaultIndex={[2, 4]} fontSize="sm">
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

      <CommandCategorySection />
      <LinkCategorySection />
    </Accordion>
  );
}

export default SideBarLinks;
