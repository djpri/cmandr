/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useColorModeValue,
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
import LoginDrawer from "../LoginDrawer/LoginDrawer";

function AppBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formType, setFormType] = React.useState("login");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [formDetails, setFormDetails] = React.useState({
    displayName: "",
    email: "djpri@baba.com",
    password: "coconuts",
  });
  const dispatch = useAppDispatch();

  const gradient = useColorModeValue(
    "linear(to-b, gray.100 0%, gray.200 10%, gray.50 90%, gray.50 100%)",
    "linear(to-b, blue.800 0%, blue.700 10%, blue.800 90%, blue.800 100%)"
  );

  return (
    <Box
      p="3"
      h="100vh"
      position="fixed"
      bgGradient={gradient}
      w="250px"
      borderRight="1px"
      borderColor="gray.500"
    >
      <LoginDrawer />
    </Box>
  );
}

export default AppBar;
