import { Button, Stack, Text, Heading, Container, Box } from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import LogInForm from "../components/auth/LogInForm/LogInForm";
import SignUpForm from "../components/auth/SignUpForm/SignUpForm";
import { selectIsInitialized, selectIsLoggedIn } from "../redux/auth/authSlice";

function LoginPage() {
  const [formType, setFormType] = useState("login");
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isInitialized = useSelector(selectIsInitialized);
  const navigate = useNavigate();
  const location = useLocation();

  // if (isInitialized && isLoggedIn) {
  //   navigate(state.path || "/");
  // }

  useEffect(() => {
    if (isInitialized && isLoggedIn) {
      navigate(location.state.from.pathname || "/");
    }
  }, [isLoggedIn, isInitialized, navigate, location.state.from.pathname]);

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
        {formType === "login" ? <LogInForm /> : <SignUpForm />}
        <Stack mt="5">
          {formType === "login" ? (
            <>
              <Text>Dont have an account?</Text>
              <Button onClick={() => setFormType("signup")}>
                Create new Account
              </Button>
            </>
          ) : (
            <>
              <Text>Already have an account?</Text>
              <Button onClick={() => setFormType("login")}>
                Log in to existing account
              </Button>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default LoginPage;
