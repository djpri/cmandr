import { useMsal } from "@azure/msal-react";
import {
  Button,
  useDisclosure,
  Text,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverArrow,
  Box,
} from "@chakra-ui/react";
import LoginButton from "components/auth/LoginButton/LoginButton";
import * as React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import SignOutButton from "../../auth/SignOutButton/SignOutButton";

function LoginDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formType] = React.useState("login");
  const btnRef: React.Ref<any> = React.useRef();
  const { accounts } = useMsal();

  const PopoverButton = () => (
    <PopoverTrigger>
      <Button
        ref={btnRef}
        colorScheme="whatsapp"
        onClick={onOpen}
        fontSize="xs"
      >
        <FaUser />
      </Button>
    </PopoverTrigger>
  );

  if (accounts[0])
    return (
      <Box position="relative" m="0">
        <Popover
          isOpen={isOpen}
          placement="bottom"
          onClose={onClose}
          // initialFocusRef={btnRef}
        >
          <PopoverButton />
          <PopoverContent top="-5px" right="30px" border="hidden">
            <PopoverArrow ml="30px" />
            <PopoverCloseButton />
            <PopoverHeader>
              <Text>
                Signed in as{" "}
                <Text as="span" fontWeight="700">
                  {accounts[0]?.name}
                </Text>
              </Text>
            </PopoverHeader>
            <PopoverBody>
              <SignOutButton />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    );

  return (
    <Box p="0" m="0">
      <Popover isOpen={isOpen} placement="bottom" onClose={onClose}>
        <PopoverButton />
        <PopoverContent top="-5px" right="30px">
          <PopoverCloseButton />
          <PopoverHeader>
            {formType === "login"
              ? "Log in to your account"
              : "Create a new account"}
          </PopoverHeader>
          <PopoverBody>
            <LoginButton />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default LoginDrawer;
