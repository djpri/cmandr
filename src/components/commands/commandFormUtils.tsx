import { Text } from "@chakra-ui/react";
import { FormUtils } from "helpers/formUtils";
import { FC } from "react";
import { RegisterOptions } from "react-hook-form";
import { isWebUri } from "valid-url";

export const labels = {
  description: "Description",
  line: "Command",
  category: "Category",
  reference: "Reference",
};

export const errorMessages = {
  reference: "Link is not a valid URL",
  description: "Description is too long",
  line: "Command is too long",
  category: "Category is required",
};

export const registerOptions: Record<string, RegisterOptions> = {
  description: {
    required: "Description is required",
    validate: (value) => value.length <= 100 || errorMessages.description,
  },
  line: {
    required: "Command is required",
    validate: (value) => value.length <= 100 || errorMessages.line,
  },
  category: {
    required: "Category is required",
    validate: (value) =>
      (value !== "" && value !== "-1" && value !== -1) ||
      errorMessages.category,
  },
  reference: {
    validate: (value) =>
      value === "" || isWebUri(value) !== undefined || errorMessages.reference,
  },
};

interface ValidationErrorProps {
  message: string;
}

export const ValidationError: FC<ValidationErrorProps> = ({ message }) => {
  return (
    <Text
      display="block"
      color="red.500"
      fontWeight="bold"
      data-cy="form-validation-error"
    >
      <span>* </span>
      {message}
    </Text>
  );
};
