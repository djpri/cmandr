import * as React from "react";
import {
  Button,
  Stack,
  Input,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUserUid } from "../../../redux/auth/authSlice";
import { useForm } from "react-hook-form";
import { setAddCommand } from "../../../redux/commands/commandsSlice";

function AddCommandForm() {
  const toast = useToast();
  const dispatch = useDispatch();
  const uid: string = useSelector(selectUserUid);

  const { handleSubmit, register, reset } = useForm();

  const addCommandToDB = async ({ howTo, command, category, reference }) => {
    try {
      const newCommandRef = await addDoc(
        collection(db, `users/${uid}/commands`),
        {
          howTo,
          command,
          reference,
          category,
        }
      );
      dispatch(
        setAddCommand({
          id: newCommandRef.id,
          howTo,
          command,
          reference,
          category,
        })
      );
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
    addCommandToDB(values);
    // alert(JSON.stringify(values, null, 2));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mb="10">
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

        <Button type="submit">Add command</Button>
      </Stack>
    </form>
  );
}

export default AddCommandForm;
