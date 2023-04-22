import { Text } from "@chakra-ui/react";
import { FC } from "react";
import { RegisterOptions } from "react-hook-form";
import { isWebUri } from "valid-url";

export const urlErrorMessages = {
  required: "Please enter a link",
  validate: "Link is not a valid URL",
};

export const urlRegisterOptions: RegisterOptions = {
  required: urlErrorMessages.required,
  validate: (value) =>
    isWebUri(value) !== undefined || urlErrorMessages.validate,
};

interface ValidationErrorProps {
  message: string;
}

export const ValidationError: FC<ValidationErrorProps> = ({ message }) => {
  return (
    <Text display="block" color="red.500" fontWeight="bold">
      <span>* </span>
      {message}
    </Text>
  );
};
