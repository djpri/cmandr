import {
  Box,
  Heading,
  HStack,
  IconButton,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "components/other/ColorModeSwitcher";
import { isInDevelopment } from "helpers/environment";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as RouterLink } from "react-router-dom";
import { setSidebarToggle } from "redux/slices/layoutSlice";
import { useAppDispatch, useAppSelector } from "redux/store";
import LoginPopover from "./LoginPopover";

function NavBar() {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.layout.isSidebarOpen);

  const bgImage = useColorModeValue(
    "linear-gradient(to right, #eeecff, #d8d4e5)",
    "linear-gradient(to right, #0a0312, #281f41);"
  );

  return (
    <Box
      as="nav"
      position="fixed"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      top="0"
      w="100vw"
      pr="1rem"
      // bgColor={bgColor}
      bgImage={bgImage}
      h="45"
      // shadow="base"
      zIndex={200}
    >
      {/* TOP BUTTONS */}
      <HStack
        pl="2"
        pr="5"
        display="flex"
        w="100%"
        flexDirection="row"
        justifyContent="space-between"
      >
        <HStack>
          {/* OPEN/CLOSE SIDEBAR BUTTON */}
          <Box>
            <IconButton
              data-cy={
                isSidebarOpen ? "close-sidebar-button" : "open-sidebar-button"
              }
              variant="ghost"
              boxShadow={"outline"}
              border="0px"
              onClick={() => dispatch(setSidebarToggle())}
              icon={<GiHamburgerMenu size="1.2rem" />}
              aria-label="Open sidebar"
              p={4}
            />
          </Box>
          <Link as={RouterLink} to="/">
            <Heading as="h1" fontSize="lg" fontWeight="900" color="whiteAlpha">
              Cmandr
            </Heading>
          </Link>
          {isInDevelopment && <Text>DEVELOPMENT MODE</Text>}
        </HStack>
        <HStack>
          <ColorModeSwitcher />
          <LoginPopover />
        </HStack>
      </HStack>
    </Box>
  );
}

export default NavBar;
