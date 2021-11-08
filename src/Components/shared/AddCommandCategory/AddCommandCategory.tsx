import { Input, Button, HStack, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUid } from "../../../redux/auth/authSlice";
import { addCommandCategory } from "../../../redux/commands/commandsSlice";
import { supabase } from "../../../supabase/supabase";

function AddCommandCategory() {
  const uid = useSelector(selectUserUid);
  const [category, setCategory] = React.useState("");
  const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();

  const addCategoryToDB = async () => {
    try {
      const { data } = await supabase.from("command_categories").insert([
        {
          user_id: uid,
          name: category,
        },
      ]);
      if (data) {
        dispatch(addCommandCategory({ id: data[0].id, name: category }));
        onToggle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        size="xs"
        aria-label="add command category"
        leftIcon={<GoPlus />}
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
          <Button size="sm" onClick={addCategoryToDB}>
            Save
          </Button>
        </HStack>
      )}
    </>
  );
}

export default AddCommandCategory;
