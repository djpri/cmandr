import { useMsal } from "@azure/msal-react";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEndOfUserSession } from "redux/slices/appSlice";

function SignOutButton() {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Button
      color="white"
      bgColor="purple.300"
      _hover={{ bgColor: "purple.200" }}
      onClick={() => {
        dispatch(setEndOfUserSession);
        navigate("/");
        instance.logoutRedirect();
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
