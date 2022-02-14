import {
  Button,
  Stack,
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
import * as React from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import LogInForm from "../../components/auth/LogInForm/LogInForm";
import SignOutButton from "../../components/auth/SignOutButton/SignOutButton";
import SignUpForm from "../../components/auth/SignUpForm/SignUpForm";
import { selectUserEmail } from "../../redux/auth/authSlice";

function LoginDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formType, setFormType] = React.useState("login");
  const btnRef: React.Ref<any> = React.useRef();
  const user = useSelector(selectUserEmail);

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

  if (user)
    return (
      <Box p="0" m="0">
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
            <PopoverHeader>{`Email: ${user}`}</PopoverHeader>
            <PopoverBody>
              <SignOutButton />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    );

  return (
    <Box>
      <Popover isOpen={isOpen} placement="right" onClose={onClose}>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader>
            {user && user}
            {formType === "login"
              ? "Log in to your account"
              : "Create a new account"}
          </PopoverHeader>
          <PopoverBody>
            {formType === "login" ? <LogInForm /> : <SignUpForm />}
            <Stack mt="5">
              {formType === "login" ? (
                <>
                  <Text>Dont have an account?</Text>
                  <Button onClick={() => setFormType("signup")}>
                    Create new Account
                  </Button>
                </>
              ) : (
                <>
                  <Text>Already have an account?</Text>
                  <Button onClick={() => setFormType("login")}>
                    Log in to existing account
                  </Button>
                </>
              )}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Button
        ref={btnRef}
        colorScheme="whatsapp"
        onClick={onOpen}
        fontSize="xs"
      >
        <FaUser />
      </Button>
    </Box>
  );
}

export default LoginDrawer;
