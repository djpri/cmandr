import { Stack, Input, Button, Text } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import {
  selectErrorMessage,
  selectIsLoading,
  selectIsLoggedIn,
  submitLoginDetails,
} from "../../../redux/auth/authSlice";
import { useAppDispatch } from "../../../redux/store";
import SignOutButton from "../SignOutButton/SignOutButton";

function LogInForm() {
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();
  const [formDetails, setFormDetails] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { id: string; value: string } }) => {
    const { id, value } = e.target;
    setFormDetails((prevState) => ({
      ...prevState,
      // [] gives a computed property name
      [id]: value,
    }));
  };

  return (
    <Stack spacing={3}>
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={formDetails.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={formDetails.password}
        onChange={handleChange}
      />
      <Button
        isLoading={isLoading}
        colorScheme="red"
        onClick={() =>
          dispatch(submitLoginDetails(formDetails.email, formDetails.password))
        }
        isDisabled={isLoggedIn}
      >
        Log In
      </Button>
      {errorMessage && (
        <Text color="red.400" fontWeight="700">
          {errorMessage}
        </Text>
      )}
      {isLoggedIn && <SignOutButton />}
    </Stack>
  );
}

export default LogInForm;
