/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { submitLoginDetails, signOutUser } from "../../Redux/auth/authSlice";
import * as React from "react";
import { useAppDispatch } from "../../Redux/store";
import { ColorModeSwitcher } from "../ColorModeSwitcher/ColorModeSwitcher";

function LoginDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formType, setFormType] = React.useState("login");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const btnRef: React.Ref<any> = React.useRef();
  const [formDetails, setFormDetails] = React.useState({
    displayName: "",
    email: "djpri@baba.com",
    password: "coconuts",
  });
  const dispatch = useAppDispatch();

  const handleChange = (e: { target: { id: string; value: string } }) => {
    const { id, value } = e.target;
    setFormDetails((prevState) => ({
      ...prevState,
      // [] gives a computed property name
      [id]: value,
    }));
  };

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
          <DrawerHeader>Log in to your account</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <Input
                name="email"
                id="displayName"
                placeholder="Display Name"
                value={formDetails.displayName}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formDetails.email}
                onChange={handleChange}
              />
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formDetails.password}
                onChange={handleChange}
              />
              <Button
                colorScheme="red"
                onClick={() =>
                  dispatch(
                    submitLoginDetails(formDetails.email, formDetails.password)
                  )
                }
                isDisabled={isLoggedIn}
              >
                Log In
              </Button>
              {isLoggedIn && <Text>logged in!</Text>}
              {errorMessage && (
                <Text color="red.400" fontWeight="700">
                  {errorMessage}
                </Text>
              )}
              <Button
                colorScheme="blue"
                // isDisabled={!isLoggedIn}
                onClick={() => {
                  dispatch(signOutUser());
                }}
              >
                Sign Out
              </Button>
              <Text>Dont have an account?</Text>
              <Button>Create new Account</Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Button ref={btnRef} colorScheme="whatsapp" onClick={onOpen}>
        Log in
      </Button>
    </>
  );
}

export default LoginDrawer;
