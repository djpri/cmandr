import { useMsal } from "@azure/msal-react";
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import LoginButton from "components/auth/LoginButton";
import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import SignOutButton from "../../../auth/SignOutButton";

function LoginPopover() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formType] = useState("login");
  const btnRef: React.Ref<any> = useRef();
  const { accounts } = useMsal();

  const PopoverButton = () => (
    <PopoverTrigger>
      <Button ref={btnRef} colorScheme="twitter" onClick={onOpen} fontSize="xs">
        <FaUser />
      </Button>
    </PopoverTrigger>
  );

  if (accounts[0])
    return (
      <Box position="relative" m="0">
        <Popover isOpen={isOpen} placement="bottom" onClose={onClose}>
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

export default LoginPopover;
