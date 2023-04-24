import { useMsal } from "@azure/msal-react";
import { Button, Stack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { apiConfig } from "auth/auth";

function LoginButton() {
  const { instance } = useMsal();
  const queryClient = useQueryClient();

  const loginRedirect = async () => {
    try {
      await instance.loginRedirect({
        scopes: apiConfig.b2cScopes,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Stack spacing={3}>
      <Button
        colorScheme="red"
        onClick={() => {
          queryClient.clear();
          loginRedirect();
        }}
      >
        Log In
      </Button>
    </Stack>
  );
}

export default LoginButton;
