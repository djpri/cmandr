/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher/ColorModeSwitcher";
import { auth } from "../../Firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

function AppBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setIsLoading] = React.useState(false);
  const [error, setIsError] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const btnRef: React.Ref<any> = React.useRef();
  const [formDetails, setFormDetails] = React.useState({
    email: "djpri@baba.com",
    password: "coconuts",
  });

  const formSubmit = (e: { preventDefault: () => void }) => {
    setIsLoading(true);
    console.log("submission");
    e.preventDefault();
    signInWithEmailAndPassword(auth, formDetails.email, formDetails.password)
      .then(() => {
        setIsLoading(false);
        setIsLoggedIn(true);
        setIsError(false);
        setErrorMessage("");
        // dispatch(setUserLogIn(userCredential.user));
      })
      .catch((error: any) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(`Login Error: ${error.code}`);
      });
  };

  const handleChange = (e: { target: { id: string; value: string } }) => {
    const { id, value } = e.target;
    setFormDetails((prevState) => ({
      ...prevState,
      // [] gives a computed property name
      [id]: value,
    }));
  };

  return (
    <Box w="100%" p="3">
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <ColorModeSwitcher justifySelf="flex-end" />
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
                onClick={formSubmit}
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
                isDisabled={!isLoggedIn}
                onClick={() => {
                  signOut(auth);
                  setIsLoggedIn(false);
                  console.log("signed out!");
                }}
              >
                Sign Out
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default AppBar;
