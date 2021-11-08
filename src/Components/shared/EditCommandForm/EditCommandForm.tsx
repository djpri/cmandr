import * as React from "react";
import {
  Button,
  Stack,
  Input,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../supabase/firebase";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import { selectUserUid } from "../../../redux/auth/authSlice";
import { useForm } from "react-hook-form";
import {
  selectAllCategoriesWithIds,
  setEditCommand,
} from "../../../redux/commands/commandsSlice";
import { CommandCategory } from "../../../types/types";

function EditCommandForm(props) {
  const { id, description, command, category, reference } = props.commandItem;
  const toast = useToast();
  const dispatch = useAppDispatch();
  const uid: string = useSelector(selectUserUid);
  const categories: CommandCategory[] = useSelector(selectAllCategoriesWithIds);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      id,
      description,
      command,
      category,
      reference,
    },
  });

  const editCommandInDB = async (values) => {
    const { id, description, command, category, reference } = values;
    try {
      await updateDoc(doc(db, `users/${uid}/commands`, id), {
        description,
        command,
        reference,
        category,
      });
      dispatch(setEditCommand(values));
      toast({
        title: "Command Changed",
        description: "command changed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (values) => {
    editCommandInDB(values);
    // closes popover if using form from popover only
    if (props.onClose) props.onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mb="10" mt="3">
        <Input {...register("id")} placeholder="id" isDisabled type="hidden" />

        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          {...register("description")}
          placeholder="How to (description of what command does)"
        />

        <FormLabel htmlFor="command">Command</FormLabel>
        <Input {...register("command")} placeholder="Command" />

        <FormLabel htmlFor="category">Category</FormLabel>
        <Select {...register("category")}>
          <option value="">Select Category</option>
          {categories &&
            categories.map((category) => (
              <option value={category.id}>{category}</option>
            ))}
        </Select>

        <FormLabel htmlFor="reference">Reference</FormLabel>
        <Input {...register("reference")} placeholder="Reference" />

        <Button type="submit" colorScheme="orange">
          Save
        </Button>
      </Stack>
    </form>
  );
}

export default EditCommandForm;
