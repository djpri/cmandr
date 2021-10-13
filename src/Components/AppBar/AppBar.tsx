import {
  useColorModeValue,
  Box,
  Button,
  Stack,
  StackItem,
  Collapse,
  Slide,
} from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../redux/auth/authSlice";
import AppBarAccordion from "./AppBarAccordion/AppBarAccordion";
import { selectIsSidebarOpen } from "../../redux/layout/layoutSlice";

const scrollbarStyles = {
  "::-webkit-scrollbar": {
    width: "8px",
  },
  "::-webkit-scrollbar-track": {
    background: "#b3b6bb",
  },
  "::-webkit-scrollbar-thumb": {
    background: "#888",
  },
  /* Handle on hover */
  "::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
  "@-moz-document url-prefix()": {
    scrollbarWidth: "thin",
    scrollbarColor: "#555",
  },
};

function AppBar() {
  const isOpen = useSelector(selectIsSidebarOpen);

  const gradient = useColorModeValue(
    "linear(to-b, gray.100 0%, gray.200 10%, gray.50 70%, gray.50 100%)",
    "linear(to-b, gray.800 0%, gray.700 10%, gray.800 40%, gray.800 100%)"
  );

  if (!isOpen) return null;

  return (
    // <Slide direction="left" in={isOpen} unmountOnExit>
    <Box
      pr="2"
      h="100vh"
      bgGradient={gradient}
      w="250px"
      top="50"
      position="fixed"
      borderColor="gray.500"
      overflowY="auto"
      sx={scrollbarStyles}
      boxSizing="content-box"
      zIndex="500"
    >
      {/* SIDE LINKS */}
      <Stack mt="5">
        <StackItem>
          <AppBarAccordion />
        </StackItem>
      </Stack>
    </Box>
    // </Slide>
  );
}

export default AppBar;
