import {
  Button,
  FormLabel,
  Input,
  Select,
  Grid,
  useToast,
  Box,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/firebase";
import { selectUserUid } from "../../../redux/auth/authSlice";
import {
  selectAllCategories,
  setAddCommand,
} from "../../../redux/commands/commandsSlice";

function AddCommandForm() {
  const toast = useToast();
  const dispatch = useDispatch();
  const uid: string = useSelector(selectUserUid);
  const categories: string[] = useSelector(selectAllCategories);

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
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid
        mb="10"
        templateColumns={[
          "repeat(1, 1fr)",
          null,
          "repeat(2, 1fr)",
          null,
          "repeat(4, 1fr)",
        ]}
        gap={6}
      >
        <Box>
          <FormLabel htmlFor="howto">Description</FormLabel>
          <Input
            {...register("howTo")}
            placeholder="How to (description of what command does)"
          />
        </Box>

        <Box>
          <FormLabel htmlFor="command">Command</FormLabel>
          <Input {...register("command")} placeholder="Command" />
        </Box>

        <Box>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Select {...register("category")}>
            <option value="">Select Category</option>
            {categories &&
              categories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
          </Select>
        </Box>

        <Box>
          <FormLabel htmlFor="reference">Reference</FormLabel>
          <Input
            {...register("reference")}
            placeholder="Reference"
            type="url"
          />
        </Box>

        <Button type="submit" colorScheme="green" size="sm" isFullWidth={false}>
          Add command
        </Button>
      </Grid>
    </form>
  );
}

export default AddCommandForm;
