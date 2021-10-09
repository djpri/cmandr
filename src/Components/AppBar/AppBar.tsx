import {
  useColorModeValue,
  Box,
  Button,
  Stack,
  StackItem,
} from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../redux/auth/authSlice";
import LoginDrawer from "../LoginDrawer/LoginDrawer";
import { ColorModeSwitcher } from "../ColorModeSwitcher/ColorModeSwitcher";
import AppBarAccordion from "./AppBarAccordion/AppBarAccordion";
import { GoChevronLeft } from "react-icons/go";

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
  const userEmail = useSelector(selectUserEmail);
  const [isOpen, setIsOpen] = React.useState(true);

  const gradient = useColorModeValue(
    "linear(to-b, gray.100 0%, gray.200 10%, gray.50 70%, gray.50 100%)",
    "linear(to-b, gray.800 0%, gray.700 10%, gray.800 40%, gray.800 100%)"
  );

  const buttonGradient = useColorModeValue(
    "linear(to-r, gray.100 0%, gray.200 10%, gray.50 70%, gray.50 100%)",
    "linear(to-r, gray.800 0%, gray.700 10%, gray.800 40%, gray.800 100%)"
  );

  if (!isOpen) return null;

  return (
    <Box
      pr="2"
      h="100vh"
      position="fixed"
      bgGradient={gradient}
      w="250px"
      top="0"
      // borderRight="2px"
      borderColor="gray.500"
      overflowY="scroll"
      // sx={scrollbarStyles}
      boxSizing="content-box"
    >
      <Box p="5" display="flex" flexDirection="column">
        <LoginDrawer buttonLabel={userEmail} />
        <ColorModeSwitcher />
      </Box>
      <Stack mt="10">
        <StackItem>
          <AppBarAccordion />
        </StackItem>
      </Stack>

      <Box position="fixed" bottom="0" w="240px">
        <Button
          border="0px"
          bgGradient={buttonGradient}
          w="100%"
          h="100%"
          onClick={() => {
            setIsOpen((prevState) => !prevState);
          }}
        >
          <GoChevronLeft size="1.2rem" />
        </Button>
      </Box>
    </Box>
  );
}

export default AppBar;
