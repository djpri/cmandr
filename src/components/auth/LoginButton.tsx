import { useMsal } from "@azure/msal-react";
import { Button, Stack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { apiConfig } from "auth/auth";

function LoginButton() {
  const { instance, accounts } = useMsal();
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
        className="login-button"
        size="md"
        bgColor="purple.400"
        color="white"
        variant="outline"
        textShadow="outline"
        _hover={{
          bgColor: "purple.300",
          textDecoration: "none",
        }}
        onClick={() => {
          queryClient.clear();
          loginRedirect();
        }}
        isDisabled={accounts[0] !== undefined}
      >
        Log In
      </Button>
    </Stack>
  );
}

export default LoginButton;
