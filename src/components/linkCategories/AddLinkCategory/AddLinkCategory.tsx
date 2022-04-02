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
      // eslint-disable-next-line no-console
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
        Add
      </Button>
      {isOpen && (
        <HStack mt="10px">
          <Input
            size="sm"
            display="block"
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
