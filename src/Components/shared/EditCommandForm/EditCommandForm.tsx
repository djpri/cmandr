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
import { useSelector } from "react-redux";
import { selectUserUid } from "../../../redux/auth/authSlice";
import { useForm } from "react-hook-form";

function EditCommandForm({ howTo, command, category, reference }) {
  const toast = useToast();
  const uid: string = useSelector(selectUserUid);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      howTo,
      command,
      category,
      reference,
    },
  });

  const editCommandInDB = async ({ howTo, command, category, reference }) => {
    try {
      await addDoc(collection(db, `users/${uid}/commands`), {
        howTo,
        command,
        reference,
        category,
      });
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
    alert(JSON.stringify(values, null, 2));
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

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}

export default EditCommandForm;
