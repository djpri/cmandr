import { useMsal } from "@azure/msal-react";
import { Center, Heading, VStack } from "@chakra-ui/react";
import LoginButton from "components/auth/LoginButton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { accounts } = useMsal();
  const navigate = useNavigate();

  useEffect(() => {
    if (accounts[0]) {
      navigate("/dashboard");
    }
  }, [accounts]);

  return (
    <Center
      h="100vh"
      w="100vw"
      background="radial-gradient(circle at top, hsl(256, 37%, 20%) 0%,  hsl(256, 37%, 15%) 50%, #131316 70%)"
    >
      {!accounts[0] && (
        <VStack>
          <Heading mb="5" as="h2" color="white">
            Log in to your account
          </Heading>
          <LoginButton />
        </VStack>
      )}
    </Center>
  );
}

export default LoginPage;
