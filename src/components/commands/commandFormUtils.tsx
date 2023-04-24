import { Text } from "@chakra-ui/react";
import { FC } from "react";
import { RegisterOptions } from "react-hook-form";
import { isWebUri } from "valid-url";

export const errorMessages = {
  reference: "Link is not a valid URL",
}

export const registerOptions: Record<string, RegisterOptions> = {
  description: {
    required: "Description is required",
  },
  line: {
    required: "Command is required",
  },
  reference: {
    validate: (value) =>
      isWebUri(value) !== undefined || errorMessages.reference,
  },
}

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
