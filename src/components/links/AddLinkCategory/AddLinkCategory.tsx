import { Button, HStack, Input, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addLinkCategoryToDB } from "../../../api/handlers/linkCategories/addLinkCategoryToDB";
import { setAddLinkCategory } from "../../../redux/links/linksSlice";

function AddLinkCategory() {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();

  const handleAddCategory = async () => {
    const { data, error } = await addLinkCategoryToDB(category);
    if (data) {
      dispatch(setAddLinkCategory(data));
      onToggle();
    }
    if (error) {
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
