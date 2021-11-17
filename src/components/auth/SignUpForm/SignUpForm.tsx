import { Stack, Input, Button, Text } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import {
  selectErrorMessage,
  submitNewAccountDetails,
} from "../../../redux/auth/authSlice";
import { useAppDispatch } from "../../../redux/store";

function SignUpForm() {
  const errorMessage = useSelector(selectErrorMessage);
  const [isLoggedIn] = React.useState(false);
  const dispatch = useAppDispatch();
  const [formDetails, setFormDetails] = React.useState({
    displayName: "",
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
        isRequired
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={formDetails.email}
        onChange={handleChange}
      />
      <Input
        isRequired
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={formDetails.password}
        onChange={handleChange}
      />
      <Input
        isRequired
        name="text"
        type="text"
        id="displayName"
        placeholder="Display Name (optional)"
        value={formDetails.displayName}
        onChange={handleChange}
      />
      <Button
        colorScheme="red"
        onClick={() =>
          dispatch(
            submitNewAccountDetails(
              formDetails.displayName,
              formDetails.email,
              formDetails.password
            )
          )
        }
        isDisabled={isLoggedIn}
      >
        Sign Up
      </Button>
      {isLoggedIn && <Text>logged in!</Text>}
      {errorMessage && (
        <Text color="red.400" fontWeight="700">
          {errorMessage}
        </Text>
      )}
    </Stack>
  );
}

export default SignUpForm;
