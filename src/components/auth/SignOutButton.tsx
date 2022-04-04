import { useMsal } from "@azure/msal-react";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setEndOfUserSession } from "redux/slices/appSlice";

function SignOutButton() {
  const { instance } = useMsal();
  const dispatch = useDispatch();
  return (
    <Button
      colorScheme="blue"
      // isDisabled={!isLoggedIn}
      onClick={() => {
        dispatch(setEndOfUserSession);
        instance.logoutRedirect();
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
