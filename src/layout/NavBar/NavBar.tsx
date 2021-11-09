import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../redux/auth/authSlice";
import { ColorModeSwitcher } from "../../components/ColorModeSwitcher/ColorModeSwitcher";
import LoginDrawer from "../../components/LoginDrawer/LoginDrawer";
import { setSidebarToggle } from "../../redux/layout/layoutSlice";
import { useAppDispatch } from "../../redux/store";

function NavBar() {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useAppDispatch();

  return (
    <Box
      position="sticky"
      top="0"
      w="100%"
      bgColor="gray.800"
      zIndex="200"
      h="50"
      shadow="base"
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