import {
  useColorModeValue,
  Box,
  Stack,
  StackItem,
  useMediaQuery,
} from "@chakra-ui/react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBarLinks from "./SideBarLinks/SideBarLinks";
import {
  selectIsSidebarOpen,
  setSidebarClosed,
} from "../../../redux/layout/layoutSlice";

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
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsSidebarOpen);
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1280px)");
  const bgColor = useColorModeValue("gray.50", "gray.800");

  // sidebar is initially closed on smaller devices
  React.useEffect(() => {
    if (isSmallerThan1280) dispatch(setSidebarClosed());
  }, [isSmallerThan1280, dispatch]);

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
          <SideBarLinks />
        </StackItem>
      </Stack>
    </Box>
    // </Slide>
  );
}

export default SideBar;
