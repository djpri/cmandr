import { Button, useToast } from "@chakra-ui/react";
import * as React from "react";
import { db } from "../../../firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUserUid } from "../../../redux/auth/authSlice";

function DeleteCommandButton({ commandId }) {
  const user = useSelector(selectUserUid);
  const toast = useToast();

  const deleteCommandById = async () => {
    try {
      await deleteDoc(doc(db, `users/${user}/commands`, commandId));
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
      onClick={deleteCommandById}
    >
      Delete
    </Button>
  );
}

export default DeleteCommandButton;
