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

// const scrollbarStyles = {
//   "::-webkit-scrollbar": {
//     width: "5px",
//   },
//   "::-webkit-scrollbar-track": {
//     background: "#2A4365",
//   },
//   "::-webkit-scrollbar-thumb": {
//     background: "#888",
//   },
//   /* Handle on hover */
//   "::-webkit-scrollbar-thumb:hover": {
//     background: "#555",
//   },
// };

function AppBar() {
  const isOpen = useSelector(selectIsSidebarOpen);

  const gradient = useColorModeValue(
    "linear(to-b, gray.100 0%, gray.200 10%, gray.50 70%, gray.50 100%)",
    "linear(to-b, gray.800 0%, gray.700 10%, gray.800 40%, gray.800 100%)"
  );

  return (
    <Slide direction="left" in={isOpen}>
      <Box
        pr="2"
        h="100vh"
        position="fixed"
        bgGradient={gradient}
        w="250px"
        // borderRight="2px"
        borderColor="gray.500"
        overflowY="scroll"
        // sx={scrollbarStyles}
        boxSizing="content-box"
        zIndex="100"
      >
        {/* SIDE LINKS */}
        <Stack mt="5">
          <StackItem>
            <AppBarAccordion />
          </StackItem>
        </Stack>
      </Box>
    </Slide>
  );
}

export default AppBar;
