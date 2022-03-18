import { Button, HStack, Input, useDisclosure } from "@chakra-ui/react";
import useCommandCategories from "hooks/commands/useCommandCategories";
import { useState } from "react";
import { AiFillFolderAdd } from "react-icons/ai";

function AddCommandCategory() {
  const { addCategoryMutation } = useCommandCategories();
  const [category, setCategory] = useState<string>(null);
  const { isOpen, onToggle } = useDisclosure();

  const handleAddCategory = () => {
    addCategoryMutation.mutate({ name: category });
  };

  return (
    <>
      <Button
        size="xs"
        aria-label="add command category"
        leftIcon={<AiFillFolderAdd />}
        onClick={onToggle}
      >
        Add category
      </Button>
      {isOpen && (
        <HStack>
          <Input
            size="sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Button size="sm" onClick={handleAddCategory}>
            Save
          </Button>
        </HStack>
      )}
    </>
  );
}

export default AddCommandCategory;
