import { Text } from "@chakra-ui/react";
import { FormUtils } from "helpers/formUtils";
import { FC } from "react";
import { RegisterOptions } from "react-hook-form";

type Fields = "description" | "language" | "code" | "category";

const labels: Record<Fields, string> = {
  description: "Description",
  language: "Language",
  code: "Code",
  category: "Category",
};

const errorMessages: Record<Fields, string> = {
  description: "Description is required",
  language: "Language is required",
  code: "Code is required",
  category: "Category is required",
};

const registerOptions: Record<Fields, RegisterOptions> = {
  description: {
    required: "Description is required",
    minLength: 3,
    maxLength: 100,
  },
  language: {
    required: "Language is required",
    maxLength: 50,
  },
  code: {
    required: "Code is required",
    maxLength: 1500,
  },
  category: {
    required: true,
  },
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

export const snippetFormUtils: FormUtils<Fields> = {
  labels,
  errorMessages,
  registerOptions,
  ValidationError,
};
