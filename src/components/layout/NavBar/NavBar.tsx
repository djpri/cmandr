import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "components/other/ColorModeSwitcher";
import { isInDevelopment } from "helpers/environment";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as RouterLink } from "react-router-dom";
import { setSidebarToggle } from "redux/slices/layoutSlice";
import { useAppDispatch } from "redux/store";
import LoginPopover from "./LoginPopover";

function NavBar() {
  const dispatch = useAppDispatch();
  const bgColor = useColorModeValue("purple.600", "purple.800");

  return (
    <Box
      position="fixed"
      top="0"
      w="100vw"
      pr="1rem"
      bgColor={isInDevelopment ? "yellow.500" : bgColor}
      color="white"
      h="50"
      shadow="base"
      zIndex={200}
    >
      {/* TOP BUTTONS */}
      <HStack
        pl="2"
        pr="5"
        pt="2"
        pb="2"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <HStack>
          {/* OPEN/CLOSE SIDEBAR BUTTON */}
          <Box>
            <Button
              variant="ghost"
              colorScheme="whiteAlpha"
              border="0px"
              onClick={() => dispatch(setSidebarToggle())}
            >
              <GiHamburgerMenu size="1.2rem" color="white" />
            </Button>
          </Box>
          <Link as={RouterLink} to="/">
            <Heading as="h1" fontSize="lg" fontWeight="900" color="whiteAlpha">
              Cmandr
            </Heading>
          </Link>
          {isInDevelopment && (
            <Text>DEVELOPMENT MODE</Text>
          )}
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
