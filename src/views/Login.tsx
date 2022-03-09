import { Heading, Container, Box } from "@chakra-ui/react";
import LoginButton from "components/auth/LoginButton/LoginButton";
import * as React from "react";
import { useState } from "react";

function LoginPage() {
  const [formType] = useState("login");
  // const navigate = useNavigate();
  // const location = useLocation();

  // if (isInitialized && isLoggedIn) {
  //   navigate(state.path || "/");
  // }

  // useEffect(() => {
  //   if (isInitialized && isLoggedIn) {
  //     navigate(location.state.from.pathname || "/");
  //   }
  // }, [isLoggedIn, isInitialized, navigate, location.state.from.pathname]);

  return (
    <Box
      h="100vh"
      position="relative"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      w="container.md"
      mx="auto"
    >
      <Heading as="h1" mb="30" w="100%" textAlign="center">
        Cmandr
      </Heading>
      <Container maxW="container.sm">
        <Heading mb="5">
          {formType === "login"
            ? "Log in to your account"
            : "Create a new account"}
        </Heading>
        <LoginButton />
      </Container>
    </Box>
  );
}

export default LoginPage;
