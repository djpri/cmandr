import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../redux/auth/authSlice";
import { ColorModeSwitcher } from "../ColorModeSwitcher/ColorModeSwitcher";
import LoginDrawer from "../LoginDrawer/LoginDrawer";
import { setSidebarToggle } from "../../redux/layout/layoutSlice";
import { useDispatch } from "react-redux";

function NavBar() {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  return (
    <Box
      position="sticky"
      top="0"
      w="100%"
      bgColor="#242425"
      zIndex="200"
      h="50"
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
              colorScheme="blackAlpha"
              _hover={{ bgColor: "gray.700" }}
              border="0px"
              onClick={() => dispatch(setSidebarToggle())}
            >
              <GiHamburgerMenu size="1.2rem" color="white" />
            </Button>
          </Box>
          <Heading as="h1" fontSize="lg" fontWeight="900" color="white">
            Cmandr
          </Heading>
        </HStack>
        <HStack>
          <ColorModeSwitcher />
          <LoginDrawer buttonLabel={userEmail} />
        </HStack>
      </HStack>
    </Box>
  );
}

export default NavBar;
