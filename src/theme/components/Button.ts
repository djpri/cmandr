import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Button: ComponentStyleConfig = {
  baseStyle: (props) => ({
    fontFamily: "Lato",
    color: props.colorMode === "dark" ? "gray.50" : "gray.900",
    fontWeight: "bold",
    boxShadow: "none",
    textTransform: "uppercase",
    borderRadius: "sm", // <-- border radius is same for all variants and sizes
  }),
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 3,
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  defaultProps: {
    size: "sm",
    variant: "solid",
  },
  variants: {
    add: (props) => ({
      bg: mode("green.100", "green.400")(props),
      _hover: {
        bg: mode("green.300", "green.300")(props),
      },
    }),
    edit: (props) => ({
      bg: props.colorMode === "dark" ? "orange.400" : "orange.200",
      _hover: {
        bg: props.colorMode === "dark" ? "orange.300" : "orange.300",
      },
    }),
    delete: (props) => ({
      bg: props.colorMode === "dark" ? "red.400" : "red.200",
      _hover: {
        bg: props.colorMode === "dark" ? "red.300" : "red.300",
      },
    }),
    save: (props) => ({
      bg: props.colorMode === "dark" ? "yellow.600" : "yellow.200",
      _hover: {
        bg: props.colorMode === "dark" ? "yellow.500" : "yellow.300",
      },
    }),
    options: (props) => ({
      bg: props.colorMode === "dark" ? "#2d6a6e" : "teal.100",
      _hover: {
        bg: props.colorMode === "dark" ? "teal.300" : "teal.200",
      },
    }),
  },
};
