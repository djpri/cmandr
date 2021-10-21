import { IconButton, Input, Button, HStack } from "@chakra-ui/react";
import { updateDoc, doc } from "firebase/firestore";
import * as React from "react";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/firebase";
import { selectUserUid } from "../../../redux/auth/authSlice";
import {
  addCommandCategory,
  selectAllCategories,
} from "../../../redux/commands/commandsSlice";

function AddCommandCategory() {
  const categories = useSelector(selectAllCategories);
  const uid = useSelector(selectUserUid);
  const [category, setCategory] = React.useState("");
  const dispatch = useDispatch();

  const addCategoryToDB = () => {
    try {
      const newCategories = [...categories, category];
      updateDoc(doc(db, "users", uid), {
        commandCategories: newCategories,
      });
      dispatch(addCommandCategory(category));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButton
        size="xs"
        aria-label="add command category"
        icon={<GoPlus />}
      />
      <HStack>
        <Input value={category} onChange={(e) => setCategory(e.target.value)} />
        <Button onClick={addCategoryToDB}>Save</Button>
      </HStack>
    </>
  );
}

export default AddCommandCategory;
