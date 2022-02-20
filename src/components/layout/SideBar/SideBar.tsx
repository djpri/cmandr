import {
  useColorModeValue,
  Box,
  Stack,
  StackItem,
  useMediaQuery,
} from "@chakra-ui/react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSidebarOpen,
  setSidebarClosed,
} from "redux/layout/layoutSlice";
import SideBarLinks from "./SideBarLinks/SideBarLinks";

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
  const borderColor = useColorModeValue("gray.300", "gray.700");

  // sidebar is initially closed on smaller devices
  React.useEffect(() => {
    if (isSmallerThan1280) dispatch(setSidebarClosed());
  }, [isSmallerThan1280, dispatch]);

  if (!isOpen) return null;

  return (
    <Box
      pr="2"
      h="100vh"
      bgColor={bgColor}
      w="242px"
      top="50"
      position="fixed"
      borderColor={borderColor}
      borderRightWidth="1px"
      overflowY="hidden"
      sx={scrollbarStyles}
      _hover={{
        overflowY: "auto",
        width: "250px",
      }}
      zIndex="500"
      boxSizing="content-box"
    >
      {/* SIDE LINKS */}
      <Stack mt="5">
        <StackItem>
          <SideBarLinks />
        </StackItem>
      </Stack>
    </Box>
  );
}

export default SideBar;
