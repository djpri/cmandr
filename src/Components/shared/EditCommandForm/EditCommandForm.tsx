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
import { db } from "../../../firebase/firebase";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import { selectUserUid } from "../../../redux/auth/authSlice";
import { useForm } from "react-hook-form";
import { setEditCommand } from "../../../redux/commands/commandsSlice";

function EditCommandForm(props) {
  const { id, howTo, command, category, reference } = props.commandItem;
  const toast = useToast();
  const dispatch = useAppDispatch();
  const uid: string = useSelector(selectUserUid);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      id,
      howTo,
      command,
      category,
      reference,
    },
  });

  const editCommandInDB = async (values) => {
    const { id, howTo, command, category, reference } = values;
    try {
      await updateDoc(doc(db, `users/${uid}/commands`, id), {
        howTo,
        command,
        reference,
        category,
      });
      dispatch(setEditCommand(values));
      toast({
        title: "Command Added",
        description: "command added successfully",
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

        <FormLabel htmlFor="howto">How to...</FormLabel>
        <Input
          {...register("howTo")}
          placeholder="How to (description of what command does)"
        />

        <FormLabel htmlFor="command">Command</FormLabel>
        <Input {...register("command")} placeholder="Command" />

        <FormLabel htmlFor="category">Category</FormLabel>
        <Select {...register("category")}>
          <option value="npm package">npm package</option>
          <option value="general">General</option>
          <option value="git">Git</option>
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
