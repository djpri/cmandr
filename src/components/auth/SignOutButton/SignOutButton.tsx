import { useMsal } from "@azure/msal-react";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../../redux/auth/authSlice";
import {
  setCommandCategories,
  setCommands,
} from "../../../redux/commands/commandsSlice";
import { setLinkCategories, setLinks } from "../../../redux/links/linksSlice";

function SignOutButton() {
  const { instance } = useMsal();
  const dispatch = useDispatch();
  return (
    <Button
      colorScheme="blue"
      // isDisabled={!isLoggedIn}
      onClick={() => {
        instance.logoutRedirect();
        dispatch(setCommands([]));
        dispatch(setCommandCategories([]));
        dispatch(setLinks([]));
        dispatch(setLinkCategories([]));
        dispatch(signOutUser());
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
