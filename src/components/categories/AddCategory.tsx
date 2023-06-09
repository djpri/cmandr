import {
  Button,
  HStack,
  Input,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import useCategories from "hooks/categories/useCategories";
import { Entity } from "models/entity";
import { useState } from "react";
import { AiFillFolderAdd, AiOutlineUnorderedList } from "react-icons/ai";

interface IProps {
  isGroup?: boolean;
  parentId?: number;
  entityType: Entity;
}

function AddCategory({ entityType, isGroup, parentId }: IProps) {
  const { addCategoryMutation } = useCategories(entityType);
  const [category, setCategory] = useState<string>("");
  const { isOpen, onToggle } = useDisclosure();
  const inputColor = useColorModeValue("#f2f6fa", "#1f2937");

  const handleAddCategory = () => {
    addCategoryMutation.mutate({
      name: category,
      isGroup,
      parentId: parentId ?? null,
    });
    setCategory("");
    onToggle();
  };

  return (
    <>
      <Button
        data-cy={`add-${isGroup ? "group" : "category"} ${entityType}`}
        size="xs"
        aria-label={`add ${entityType} category`}
        leftIcon={isGroup ? <AiFillFolderAdd /> : <AiOutlineUnorderedList />}
        onClick={onToggle}
        boxShadow="outline"
      >
        {isGroup ? "New Group" : "New Category"}
      </Button>
      {isOpen && (
        <HStack>
          <Input
            data-cy={`add-${
              isGroup ? "group" : "category"
            } ${entityType} input`}
            size="sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="filled"
            bgColor={inputColor}
            _hover={{ bgColor: inputColor }}
            _focus={{ bgColor: inputColor }}
          />
          <Button
            data-cy={`add-${isGroup ? "group" : "category"} ${entityType} save`}
            size="sm"
            onClick={handleAddCategory}
            disabled={category.length < 1}
          >
            Save
          </Button>
        </HStack>
      )}
    </>
  );
}

export default AddCategory;
