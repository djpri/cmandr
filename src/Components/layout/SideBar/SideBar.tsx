import { useColorModeValue, Box, Stack, StackItem } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import SideBarAccordion from "./SideBarAccordion/SideBarAccordion";
import { selectIsSidebarOpen } from "../../../redux/layout/layoutSlice";

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

function SideBar() {
  const isOpen = useSelector(selectIsSidebarOpen);
  const bgColor = useColorModeValue("gray.100", "gray.800");

  if (!isOpen) return null;

  return (
    // <Slide direction="left" in={isOpen} unmountOnExit>
    <Box
      pr="2"
      h="100vh"
      bgColor={bgColor}
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
          <SideBarAccordion />
        </StackItem>
      </Stack>
    </Box>
    // </Slide>
  );
}

export default SideBar;
