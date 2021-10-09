import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import LogInForm from "../shared/LogInForm/LogInForm";
import SignUpForm from "../shared/SignUpForm/SignUpForm";

function LoginDrawer({ buttonLabel }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formType, setFormType] = React.useState("login");
  const btnRef: React.Ref<any> = React.useRef();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {formType === "login"
              ? "Log in to your account"
              : "Create a new account"}
          </DrawerHeader>
          <DrawerBody>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Button
        ref={btnRef}
        colorScheme="whatsapp"
        onClick={onOpen}
        fontSize="xs"
      >
        {buttonLabel ? buttonLabel : "Log in"}
      </Button>
    </>
  );
}

export default LoginDrawer;
