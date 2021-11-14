import { Button, Stack, Text, Heading, Container, Box } from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import LogInForm from "../../components/LogInForm/LogInForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { selectUserEmail } from "../../redux/auth/authSlice";

function LoginPage() {
  const [formType, setFormType] = React.useState("login");
  const user = useSelector(selectUserEmail);
  const history = useHistory();

  useEffect(() => {
    if (user) history.push("/commands");
  }, [user, history]);

  return (
    <Box
      h="100vh"
      position="relative"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading as="h1" mb="30">
        Cmandr
      </Heading>
      <Container maxW="container.md">
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
