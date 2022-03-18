import { Button, HStack, Input, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import useLinkCategories from "../../../hooks/links/useLinkCategories";

function AddLinkCategory() {
  const [category, setCategory] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const { addCategoryMutation } = useLinkCategories();

  const handleAddCategory = async () => {
    try {
      await addCategoryMutation.mutate({ name: category });
      onToggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        size="xs"
        aria-label="add link category"
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

export default AddLinkCategory;
