import * as React from "react";
import {
  Button,
  Stack,
  Input,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useSelector } from "react-redux";
import { selectUserUid } from "../../../redux/auth/authSlice";

function AddCommandForm() {
  const toast = useToast();
  const uid: string = useSelector(selectUserUid);

  const handleAddCommand = async ({ howTo, command, category, reference }) => {
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

  const formik = useFormik({
    initialValues: {
      howTo: "basic",
      command: "npm install command ye",
      category: "git",
      reference: "https://google.com",
    },
    onSubmit: (values) => {
      handleAddCommand(values);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack mb="10">
        <FormLabel htmlFor="howto">How to...</FormLabel>
        <Input
          name="howTo"
          placeholder="How to (description of what command does)"
          onChange={formik.handleChange}
          value={formik.values.howTo}
        />

        <FormLabel htmlFor="command">Command</FormLabel>
        <Input
          name="command"
          placeholder="Command"
          onChange={formik.handleChange}
          value={formik.values.command}
        />

        <FormLabel htmlFor="category">Category</FormLabel>
        <Select name="category" onChange={formik.handleChange}>
          <option value="npm package">npm package</option>
          <option value="general">General</option>
          <option value="git">Git</option>
        </Select>

        <FormLabel htmlFor="reference">Reference</FormLabel>
        <Input
          name="reference"
          placeholder="Reference"
          onChange={formik.handleChange}
          value={formik.values.reference}
        />

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}

export default AddCommandForm;
