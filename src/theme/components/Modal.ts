import { mode } from "@chakra-ui/theme-tools";
import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const Modal: ComponentMultiStyleConfig = {
  baseStyle: (props) => ({
    dialog: {
      bg: mode("gray.50", "gray.800")(props),
    },
  }),
  parts: parts.keys,
};
