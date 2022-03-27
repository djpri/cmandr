import { useMsal } from "@azure/msal-react";
import { Button, Stack } from "@chakra-ui/react";
import { apiConfig } from "auth/apiConfig";

function LoginButton() {
  const { instance } = useMsal();

  const loginRedirect = async () => {
    try {
      await instance.loginRedirect({
        scopes: apiConfig.b2cScopes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack spacing={3}>
      <Button
        colorScheme="red"
        onClick={() => {
          loginRedirect();
        }}
      >
        Log In
      </Button>
    </Stack>
  );
}

export default LoginButton;