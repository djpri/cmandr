import { Button, useToast } from "@chakra-ui/react";
import * as React from "react";
import { db } from "../../../firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { selectUserUid } from "../../../redux/auth/authSlice";
import { setDeleteCommand } from "../../../redux/commands/commandsSlice";

function DeleteCommandButton({ commandId, onClick }) {
  const user = useSelector(selectUserUid);
  const dispatch = useDispatch();
  const toast = useToast();

  const deleteCommandById = async () => {
    try {
      await deleteDoc(doc(db, `users/${user}/commands`, commandId));
      dispatch(setDeleteCommand(commandId));
      toast({
        title: "Command Deleted",
        description: "command deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "command not deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Button
      size="xs"
      bgColor="red.500"
      color="white"
      onClick={() => {
        deleteCommandById();
        onClick();
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteCommandButton;
