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
import useCategories from "hooks/categories/useCategories";
import { CategoryReadDto } from "models/category";
import { Entity } from "models/entity";
import { FC } from "react";
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
import { entityRoute } from "routes";
import CategoriesList from "./CategoriesList/CategoriesList";
import useRemoveFromGroupDropItem from "./CategoriesList/DnD/useRemoveFromGroupDropItem";

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
        <AccordionItem
          as={RouterLink}
          to={route}
          aria-label={`Link to all ${type}s`}
        >
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

interface CategorySectionProps {
  entityType: Entity;
  entityRoute: entityRoute;
  icon: JSX.Element;
}

const CategorySection: FC<CategorySectionProps> = ({
  entityType,
  entityRoute,
  icon,
}) => {
  const { query, editCategoryMutation } = useCategories(entityType);
  const { addToCategoryDropRef, isAddToGroupDropActive } =
    useRemoveFromGroupDropItem(entityType, editCategoryMutation, query.data);
  return (
    <CategoryAccordion
      addToCategoryDropRef={addToCategoryDropRef}
      isAddToGroupDropActive={isAddToGroupDropActive}
      type={entityType}
      route={entityRoute}
      query={query}
      editCategoryMutation={editCategoryMutation}
      icon={icon}
      sidebarIndex={2}
    />
  );
};

function SideBarLinks() {
  const defaultIndex = useAppSelector(selectSidebarAccordionIndex);

  return (
    <Accordion allowMultiple defaultIndex={defaultIndex} fontSize="sm">
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

      <CategorySection
        entityType="command"
        entityRoute="commands"
        icon={<BiCommand />}
      />
      <CategorySection
        entityType="link"
        entityRoute="links"
        icon={<FaExternalLinkSquareAlt />}
      />
      <CategorySection
        entityType="snippet"
        entityRoute="snippets"
        icon={<AiFillCode />}
      />
    </Accordion>
  );
}

export default SideBarLinks;
