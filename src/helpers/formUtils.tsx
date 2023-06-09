import { Text } from "@chakra-ui/react";
import { FC } from "react";
import { RegisterOptions } from "react-hook-form";

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

export type FormUtils<Fields extends string> = {
  labels: Record<Fields, string>;
  errorMessages: Record<Fields, string>;
  registerOptions: Record<Fields, RegisterOptions>;
  ValidationError: FC<ValidationErrorProps>;
};
