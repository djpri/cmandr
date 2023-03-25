import {
  Button,
  HStack,
  Input,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import useCommandCategories from "hooks/commands/useCommandCategories";
import { useState } from "react";
import { AiFillFolderAdd, AiOutlineUnorderedList } from "react-icons/ai";

interface IProps {
  isGroup?: boolean;
  parentId?: number;
}

function AddCommandCategory({ isGroup, parentId }: IProps) {
  const { addCategoryMutation } = useCommandCategories();
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
        size="xs"
        aria-label="add command category"
        leftIcon={isGroup ? <AiFillFolderAdd /> : <AiOutlineUnorderedList />}
        onClick={onToggle}
        boxShadow="outline"
      >
        {isGroup ? "New Group" : "New Category"}
      </Button>
      {isOpen && (
        <HStack>
          <Input
            size="sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="filled"
            bgColor={inputColor}
            _hover={{ bgColor: inputColor }}
            _focus={{ bgColor: inputColor }}
          />
          <Button
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

export default AddCommandCategory;
