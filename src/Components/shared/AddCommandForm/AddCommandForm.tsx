import {
  Button,
  FormLabel,
  Input,
  Select,
  Grid,
  useToast,
  Box,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUid } from "../../../redux/auth/authSlice";
import {
  selectAllCategories,
  setAddCommand,
} from "../../../redux/commands/commandsSlice";
import { supabase } from "../../../supabase/supabase";
import { CommandCategory } from "../../../types/types";

function AddCommandForm() {
  const toast = useToast();
  const dispatch = useDispatch();
  const uid: string = useSelector(selectUserUid);
  const categories: string[] = useSelector(selectAllCategories);

  const { handleSubmit, register, reset } = useForm();

  const addCommandToDB = async ({
    description,
    command,
    category,
    reference,
  }) => {
    const { data, error } = await supabase.from("commands").insert([
      {
        user_id: uid,
        description,
        command,
        reference,
      },
    ]);

    if (data !== null) {
      console.log(data);
      dispatch(
        setAddCommand({
          id: data[0].id,
          description,
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
    }
    if (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            {...register("description")}
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
