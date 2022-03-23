import {
  Box,
  Stack,
  StackItem,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSidebarOpen,
  setSidebarClosed,
} from "redux/slices/layoutSlice";
import SideBarLinks from "./SideBarLinks/SideBarLinks";

const scrollbarStyles = {
  "::-webkit-scrollbar": {
    position: "absolute",
    width: "8px",
  },
  "::-webkit-scrollbar-track": {
    opacity: 0,
  },
  "::-webkit-scrollbar-thumb": {
    background: "#555",
    display: "none",
    borderRadius: "4px",
  },
  "@-moz-document url-prefix()": {
    scrollbarWidth: "thin",
    scrollbarColor: "#555",
  },
};

const hoverStyle = {
  "::-webkit-scrollbar-thumb": {
    display: "block",
  },
};

function SideBar() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsSidebarOpen);
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1280px)");
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.700");

  // sidebar is initially closed on smaller devices
  useEffect(() => {
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
      overflowY="auto"
      sx={scrollbarStyles}
      _hover={hoverStyle}
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
