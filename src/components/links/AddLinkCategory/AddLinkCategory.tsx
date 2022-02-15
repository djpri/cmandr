import { Input, Button, HStack, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUid } from "../../../redux/auth/authSlice";
import { addLinkCategoryToDB } from "../../../api/handlers/linkCategories/addLinkCategoryToDB";
import { setAddLinkCategory } from "../../../redux/links/linksSlice";
import { AiFillFolderAdd } from "react-icons/ai";

function AddLinkCategory() {
  const uid = useSelector(selectUserUid);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();

  const handleAddCategory = async () => {
    const { data, error } = await addLinkCategoryToDB(uid, category);
    if (data) {
      dispatch(setAddLinkCategory({ id: data.id, name: category }));
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
