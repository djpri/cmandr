import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Text,
} from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import { ConnectDropTarget } from "react-dnd/dist/types";
import { AiFillCode, AiFillWallet } from "react-icons/ai";
import { BiCommand } from "react-icons/bi";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";
import {
  selectSidebarAccordionIndex,
  setSidebarAccordionIndex,
} from "redux/slices/layoutSlice";
import { useAppDispatch, useAppSelector } from "redux/store";
import CategoriesList from "./CategoriesList/CategoriesList";
import useRemoveFromGroupDropItem from "./CategoriesList/DnD/useRemoveFromGroupDropItem";
import useCategories from "hooks/categories/useCategories";
import { Entity } from "models/entity";
import { CategoryReadDto } from "models/category";

const textMargin = "8px";

type CategoryAccordionProps = {
  addToCategoryDropRef: ConnectDropTarget;
  isAddToGroupDropActive: boolean;
  type: Entity;
  route: string;
  query: UseQueryResult<CategoryReadDto[], unknown>;
  editCategoryMutation: any;
  icon: JSX.Element;
  sidebarIndex: number;
};

const CategoryAccordion = ({
  addToCategoryDropRef,
  isAddToGroupDropActive,
  type,
  route,
  query,
  editCategoryMutation,
  icon,
  sidebarIndex,
}: CategoryAccordionProps) => {
  const dispatch = useAppDispatch();

  const setIndex = () => {
    dispatch(setSidebarAccordionIndex(sidebarIndex));
  };

  return (
    <AccordionItem>
      <AccordionButton
        textAlign="left"
        ref={addToCategoryDropRef}
        border={isAddToGroupDropActive && "2px solid red"}
        onClick={setIndex}
      >
        {icon}
        <Text
          flex="1"
          fontWeight="700"
          letterSpacing="1px"
          ml={textMargin}
          textTransform="capitalize"
        >
          {`${type}s`}
        </Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <AccordionItem as={RouterLink} to={route} aria-label={`Link to all ${type}s`}>
          <AccordionButton>
            <HStack>
              <AiFillWallet />
              <Text textTransform="capitalize">{`All ${type}s`}</Text>
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
};

// TODO: Reduce duplication in these components

const CommandCategorySection = () => {
  const { query, editCategoryMutation } = useCategories("command");
  const { addToCategoryDropRef, isAddToGroupDropActive } =
    useRemoveFromGroupDropItem("command", editCategoryMutation, query.data);
  return (
    <CategoryAccordion
      addToCategoryDropRef={addToCategoryDropRef}
      isAddToGroupDropActive={isAddToGroupDropActive}
      type="command"
      route="/commands"
      query={query}
      editCategoryMutation={editCategoryMutation}
      icon={<BiCommand />}
      sidebarIndex={2}
    />
  );
};

const LinkCategorySection = () => {
  const { query, editCategoryMutation } = useCategories("link");
  const { addToCategoryDropRef, isAddToGroupDropActive } =
    useRemoveFromGroupDropItem("link", editCategoryMutation, query.data);

  return (
    <CategoryAccordion
      addToCategoryDropRef={addToCategoryDropRef}
      isAddToGroupDropActive={isAddToGroupDropActive}
      type="link"
      route="/links"
      query={query}
      editCategoryMutation={editCategoryMutation}
      icon={<FaExternalLinkSquareAlt />}
      sidebarIndex={4}
    />
  );
};

const SnippetCategorySection = () => {
  const { query, editCategoryMutation } = useCategories("snippet");
  const { addToCategoryDropRef, isAddToGroupDropActive } =
    useRemoveFromGroupDropItem("snippet", editCategoryMutation, query.data);
  return (
    <CategoryAccordion
      addToCategoryDropRef={addToCategoryDropRef}
      isAddToGroupDropActive={isAddToGroupDropActive}
      type="snippet"
      route="/snippets"
      query={query}
      editCategoryMutation={editCategoryMutation}
      icon={<AiFillCode />}
      sidebarIndex={6}
    />
  );
};

function SideBarLinks() {
  const defaultIndex = useAppSelector(selectSidebarAccordionIndex);

  return (
    <Accordion allowMultiple defaultIndex={defaultIndex} fontSize="sm">
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
      <SnippetCategorySection />
    </Accordion>
  );
}

export default SideBarLinks;
