import {
  Button,
  HStack,
  Input,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillFolderAdd, AiOutlineUnorderedList } from "react-icons/ai";
import useLinkCategories from "../../hooks/links/useLinkCategories";

interface IProps {
  isGroup?: boolean;
  parentId?: number;
}

function AddLinkCategory({ isGroup, parentId }: IProps) {
  const [category, setCategory] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const { addCategoryMutation } = useLinkCategories();
  const inputColor = useColorModeValue("#f2f6fa", "#1f2937");

  const handleAddCategory = () => {
    try {
      addCategoryMutation.mutate({
        name: category,
        isGroup,
        parentId: parentId ?? null,
      });
      setCategory("");
      onToggle();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <Button
        size="xs"
        aria-label="add link category"
        leftIcon={isGroup ? <AiFillFolderAdd /> : <AiOutlineUnorderedList />}
        onClick={onToggle}
        boxShadow="outline"
      >
        {isGroup ? "New Group" : "New Category"}
      </Button>
      {isOpen && (
        <HStack my={2}>
          <Input
            size="sm"
            display="block"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

export default AddLinkCategory;
