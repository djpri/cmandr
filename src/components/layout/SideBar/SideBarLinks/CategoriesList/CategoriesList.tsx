import { AccordionItem, Flex, Spinner } from "@chakra-ui/react";
import AddCommandCategory from "components/commandCategories/AddCommandCategory/AddCommandCategory";
import AddLinkCategory from "components/linkCategories/AddLinkCategory/AddLinkCategory";
import { CategoryReadDto } from "models/category";
import { useState } from "react";
import CategoryGroup from "./CategoryGroup";
import CategoryInfo from "./CategoryInfo";

interface IProps {
  items: CategoryReadDto[];
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  type: "commands" | "links";
}

function CategoriesList({ items, isIdle, isLoading, isError, type }: IProps) {
  const [categories] = useState(items);
  if (isIdle) return null;
  if (isLoading)
    return (
      <AccordionItem p="8px 24px" borderTop="none">
        <Spinner />
      </AccordionItem>
    );
  if (isError)
    return (
      <AccordionItem p="8px 24px" borderTop="none">
        Error: Could not load categories
      </AccordionItem>
    );
  if (!categories) return null;

  const topLevelCategories = categories.filter(
    (item: CategoryReadDto) => item?.parentId === 0
  );

  return (
    <>
      {topLevelCategories.map((item: CategoryReadDto) => {
        if (item.isGroup) {
          return (
            <CategoryGroup
              item={item}
              key={item.id}
              isChild={false}
              depth={0}
              type={type}
              categories={categories}
            />
          );
        } else {
          return (
            <CategoryInfo
              item={item}
              key={item.id}
              isChild={false}
              depth={0}
              type={type}
              categories={categories}
            />
          );
        }
      })}
      <AccordionItem borderTop="none">
        <Flex pt="2" py="4" px="6" flexDirection="column" gap={2}>
          {type === "links" && (
            <>
              {/* <AddLinkCategory isGroup /> */}
              <AddLinkCategory />
            </>
          )}
          {type === "commands" && (
            <>
              {/* <AddCommandCategory isGroup /> */}
              <AddCommandCategory />
            </>
          )}
        </Flex>
      </AccordionItem>
    </>
  );
}

export default CategoriesList;
