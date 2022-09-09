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
    transitionProperty: "background-color",
    transitionDuration: "0ms",
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
      color: "white",
      bg: mode("#4CB37C", "#4CB37C")(props),
      _hover: {
        bg: mode("#4CB37C", "#4CB37C")(props),
      },
    }),
    edit: (props) => ({
      bg: props.colorMode === "dark" ? "gray.600" : "gray.200",
      _hover: {
        bg: props.colorMode === "dark" ? "gray.500" : "gray.100",
      },
    }),
    delete: (props) => ({
      bg: props.colorMode === "dark" ? "#F42A41" : "#F6B2AC",
      _hover: {
        bg: props.colorMode === "dark" ? "#F42A41" : "#F6B2AC",
      },
    }),
    save: (props) => ({
      bg: props.colorMode === "dark" ? "#5C7D74" : "#D4DFDC",
      _hover: {
        bg: props.colorMode === "dark" ? "#5C7D74" : "#D4DFDC",
      },
    }),
    options: (props) => ({
      bg: props.colorMode === "dark" ? "gray.600" : "gray.200",
      _hover: {
        bg: props.colorMode === "dark" ? "gray.500" : "gray.100",
      },
    }),
  },
};
