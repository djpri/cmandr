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
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import LogInForm from "../../components/auth/LogInForm/LogInForm";
import SignOutButton from "../../components/auth/SignOutButton/SignOutButton";
import SignUpForm from "../../components/auth/SignUpForm/SignUpForm";
import { selectUserEmail } from "../../redux/auth/authSlice";

function LoginDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formType, setFormType] = React.useState("login");
  const btnRef: React.Ref<any> = React.useRef();
  const user = useSelector(selectUserEmail);

  if (user)
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
            <DrawerHeader>{user}</DrawerHeader>
            <DrawerBody>
              <SignOutButton />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Button
          ref={btnRef}
          colorScheme="whatsapp"
          onClick={onOpen}
          fontSize="xs"
        >
          <FaUser />
        </Button>
      </>
    );

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
            {user && user}
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
        <FaUser />
      </Button>
    </>
  );
}

export default LoginDrawer;
