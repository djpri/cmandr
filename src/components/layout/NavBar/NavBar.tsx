import {
  Box,
  Button,
  Heading,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { setSidebarToggle } from "redux/slices/layoutSlice";
import { useAppDispatch } from "redux/store";
import { ColorModeSwitcher } from "../../other/ColorModeSwitcher";
import LoginPopover from "./LoginPopover/LoginPopover";

function NavBar() {
  const dispatch = useAppDispatch();
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const iconColor = useColorModeValue("black", "white");

  return (
    <Box
      position="fixed"
      top="0"
      w="100%"
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
              _hover={{ bgColor: "gray.700" }}
              border="0px"
              onClick={() => dispatch(setSidebarToggle())}
            >
              <GiHamburgerMenu size="1.2rem" color={iconColor} />
            </Button>
          </Box>
          <Heading as="h1" fontSize="lg" fontWeight="900" color="whiteAlpha">
            Cmandr
          </Heading>
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
