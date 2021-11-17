import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../../redux/auth/authSlice";

function SignOutButton() {
  const dispatch = useDispatch();
  return (
    <Button
      colorScheme="blue"
      // isDisabled={!isLoggedIn}
      onClick={() => {
        dispatch(signOutUser());
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
