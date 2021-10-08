/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useColorModeValue,
  Box,
  Button,
  Stack,
  Text,
  Link,
  StackItem,
  StackDivider,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../redux/auth/authSlice";
import LoginDrawer from "../LoginDrawer/LoginDrawer";
import { ColorModeSwitcher } from "../ColorModeSwitcher/ColorModeSwitcher";
import AppBarAccordion from "./AppBarAccordion/AppBarAccordion";

function AppBar() {
  const userEmail = useSelector(selectUserEmail);

  const gradient = useColorModeValue(
    "linear(to-b, gray.100 0%, gray.200 10%, gray.50 70%, gray.50 100%)",
    "linear(to-b, blue.800 0%, blue.700 10%, blue.800 40%, blue.800 100%)"
  );

  return (
    <Box
      p="2"
      h="100vh"
      position="fixed"
      bgGradient={gradient}
      w="250px"
      top="0"
      // borderRight="2px"
      borderColor="gray.500"
    >
      <Box p="5" display="flex" flexDirection="column">
        {userEmail !== null ? (
          <>
            <Button bgColor="purple.500" color="whiteAlpha.900">
              {userEmail}
            </Button>
            <LoginDrawer />
          </>
        ) : (
          <LoginDrawer />
        )}
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
      <Stack mt="10">
        <StackItem>
          <AppBarAccordion />
        </StackItem>
      </Stack>
    </Box>
  );
}

export default AppBar;
