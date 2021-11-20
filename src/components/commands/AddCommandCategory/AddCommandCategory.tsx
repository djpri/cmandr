import { Input, Button, HStack, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUid } from "../../../redux/auth/authSlice";
import { addCommandCategory } from "../../../redux/commands/commandsSlice";
import { addCommandCategoryToDB } from "../../../services/commandCategories/addCommandCategoryToDB";

function AddCommandCategory() {
  const uid = useSelector(selectUserUid);
  const [category, setCategory] = React.useState("");
  const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();

  const handleAddCategory = async () => {
    const { data, error } = await addCommandCategoryToDB(uid, category);
    if (data) {
      dispatch(addCommandCategory({ id: data.id, name: category }));
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
