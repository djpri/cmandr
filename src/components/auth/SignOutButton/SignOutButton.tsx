import { useMsal } from "@azure/msal-react";
import { Button } from "@chakra-ui/react";
import React from "react";

function SignOutButton() {
  const { instance } = useMsal();
  return (
    <Button
      colorScheme="blue"
      // isDisabled={!isLoggedIn}
      onClick={() => {
        instance.logoutRedirect();
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
