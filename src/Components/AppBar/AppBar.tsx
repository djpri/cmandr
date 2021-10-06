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
import {
  submitLoginDetails,
  submitNewAccountDetails,
  signOutUser,
} from "../../Redux/auth/authSlice";
import { useAppDispatch } from "../../Redux/store";

function AppBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formType, setFormType] = React.useState("login");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const btnRef: React.Ref<any> = React.useRef();
  const [formDetails, setFormDetails] = React.useState({
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
                  setIsLoggedIn(false);
                }}
              >
                Sign Out
              </Button>
              <Text>Dont have an account?</Text>
              <Button
                onClick={() =>
                  dispatch(
                    submitNewAccountDetails(
                      formDetails.email,
                      formDetails.password
                    )
                  )
                }
              >
                Create new Account
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default AppBar;
