import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "components/other/ColorModeSwitcher";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as RouterLink } from "react-router-dom";
import { setSidebarToggle } from "redux/slices/layoutSlice";
import { useAppDispatch } from "redux/store";
import LoginPopover from "./LoginPopover";

function NavBar() {
  const dispatch = useAppDispatch();
  const bgColor = useColorModeValue("gray.200", "gray.900");
  const iconColor = useColorModeValue("black", "white");

  return (
    <Box
      position="fixed"
      top="0"
      w="100vw"
      pr="1rem"
      bgColor={bgColor}
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
              <GiHamburgerMenu size="1.2rem" color={iconColor} />
            </Button>
          </Box>
          <Link as={RouterLink} to="/">
            <Heading as="h1" fontSize="lg" fontWeight="900" color="whiteAlpha">
              Cmandr
            </Heading>
          </Link>
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
