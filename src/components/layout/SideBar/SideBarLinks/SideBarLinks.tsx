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
import { AiFillCode, AiFillWallet } from "react-icons/ai";
import { BiCommand } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";
import CategoriesList from "./CategoriesList/CategoriesList";
import useRemoveFromGroupDropItem from "./CategoriesList/DnD/useRemoveFromGroupDropItem";
import { UseQueryResult } from "@tanstack/react-query";
import { ConnectDropTarget } from "react-dnd/dist/types";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

const textMargin = "8px";

type CategoryAccordionProps = {
  addToCategoryDropRef: ConnectDropTarget;
  isAddToGroupDropActive: boolean;
  type: "commands" | "links" | "snippets";
  route: string;
  query: UseQueryResult<any, unknown>;
  editCategoryMutation: any;
  icon: JSX.Element;
};

const CategoryAccordion = ({
  addToCategoryDropRef,
  isAddToGroupDropActive,
  type,
  route,
  query,
  editCategoryMutation,
  icon
}: CategoryAccordionProps) => (
  <AccordionItem>
    <AccordionButton
      textAlign="left"
      ref={addToCategoryDropRef}
      border={isAddToGroupDropActive && "2px solid red"}
    >
      {icon}
      <Text flex="1" fontWeight="700" letterSpacing="1px" ml={textMargin} textTransform="capitalize">
        {type}
      </Text>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>
      <AccordionItem as={RouterLink} to={route}>
        <AccordionButton>
          <HStack>
            <AiFillWallet />
            <Text textTransform="capitalize">{`All ${type}`}</Text>
          </HStack>
        </AccordionButton>
      </AccordionItem>
      <CategoriesList
        type={type}
        query={query}
        editCategoryMutation={editCategoryMutation}
      />
    </AccordionPanel>
  </AccordionItem>
);

const CommandCategorySection = () => {
  const { query, editCategoryMutation } = useCommandCategories();
  const { addToCategoryDropRef, isAddToGroupDropActive } =
    useRemoveFromGroupDropItem("commands", editCategoryMutation, query.data);
  return (
    <CategoryAccordion
      addToCategoryDropRef={addToCategoryDropRef}
      isAddToGroupDropActive={isAddToGroupDropActive}
      type="commands"
      route="/commands"
      query={query}
      editCategoryMutation={editCategoryMutation}
      icon={<BiCommand />}
     />
  );
};

const LinkCategorySection = () => {
  const { query, editCategoryMutation } = useLinkCategories();
  const { addToCategoryDropRef, isAddToGroupDropActive } =
    useRemoveFromGroupDropItem("links", editCategoryMutation, query.data);

  return (
    <CategoryAccordion 
      addToCategoryDropRef={addToCategoryDropRef}
      isAddToGroupDropActive={isAddToGroupDropActive}
      type="links"
      route="/links"
      query={query}
      editCategoryMutation={editCategoryMutation}
      icon={<FaExternalLinkSquareAlt />}
    />
  );
};

const SnippetCategorySection = () => {
  const { query, editCategoryMutation } = useLinkCategories();
  const { addToCategoryDropRef, isAddToGroupDropActive } =
    useRemoveFromGroupDropItem("snippets", editCategoryMutation, query.data);
  return (
    <CategoryAccordion
      addToCategoryDropRef={addToCategoryDropRef}
      isAddToGroupDropActive={isAddToGroupDropActive}
      type="snippets"
      route="/spinnets"
      query={query}
      editCategoryMutation={editCategoryMutation}
      icon={<AiFillCode/>}
    />
  )
};

function SideBarLinks() {
  return (
    <Accordion allowMultiple defaultIndex={[2, 4]} fontSize="sm">
      <AccordionItem textAlign="left" as={RouterLink} to="/" borderTop="none">
        <AccordionButton fontWeight="700" letterSpacing="1px">
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
        <AccordionButton fontWeight="700" letterSpacing="1px">
          <IoMdHome />
          <Text ml={textMargin}>Dashboard</Text>
        </AccordionButton>
      </AccordionItem>

      <CommandCategorySection />
      <LinkCategorySection />
      {/* <SnippetCategorySection /> */}
    </Accordion>
  );
}

export default SideBarLinks;
