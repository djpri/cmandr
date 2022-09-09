import { useMsal } from "@azure/msal-react";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setEndOfUserSession } from "redux/slices/appSlice";

function SignOutButton() {
  const { instance } = useMsal();
  const dispatch = useDispatch();
  return (
    <Button
      color="white"
      bgColor="purple.300"
      _hover={{ bgColor: "purple.200" }}
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
