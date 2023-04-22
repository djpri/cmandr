import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Button: ComponentStyleConfig = {
  baseStyle: (props) => ({
    color: props.colorMode === "dark" ? "gray.50" : "gray.900",
    fontWeight: "600",
    boxShadow: "none",
    textTransform: "Capitalize",
    borderRadius: "sm", // <-- border radius is same for all variants and sizes
    transitionProperty: "background-color",
    transitionDuration: "0ms",
    letterSpacing: "0.05rem",
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
      color: mode("hsl(0, 0%, 100%)", "hsl(0, 0%, 100%)")(props),
      bg: mode("hsl(130, 30%, 55%)", "hsl(130, 35%, 50%)")(props),
      _hover: {
        bg: mode("hsl(130, 30%, 60%)", "hsl(130, 35%, 55%)")(props),
      },
      _active: {
        bg: mode("hsl(130, 30%, 65%)", "hsl(130, 35%, 60%)")(props),
      },
    }),
    edit: (props) => ({
      bg: props.colorMode === "dark" ? "gray.600" : "gray.200",
      _hover: {
        bg: props.colorMode === "dark" ? "gray.500" : "gray.100",
      },
      _active: {
        bg: props.colorMode === "dark" ? "gray.500" : "gray.100",
      },
    }),
    delete: (props) => ({
      color: mode("white", "white")(props),

      bg: mode("hsl(353, 56%, 60%)", "hsl(353, 56%, 50%)")(props),
      _hover: {
        bg: mode("hsl(353, 56%, 55%)", "hsl(353, 56%, 55%)")(props),
      },
      _active: {
        bg: mode("hsl(353, 56%, 50%)", "hsl(353, 56%, 60%)")(props),
      },
    }),
    save: (props) => ({
      bg: mode("hsl(353, 0%, 90%)", "hsl(353, 0%, 50%)")(props),
      _hover: {
        bg: mode("hsl(353, 0%, 55%)", "hsl(353, 0%, 55%)")(props),
      },
      _active: {
        bg: mode("hsl(353, 0%, 50%)", "hsl(353, 0%, 60%)")(props),
      },
    }),
    options: (props) => ({
      bg: mode("hsl(353, 0%, 90%)", "hsl(353, 0%, 30%)")(props),
      _hover: {
        bg: mode("hsl(353, 0%, 95%)", "hsl(353, 0%, 25%)")(props),
      },
      _active: {
        bg: mode("hsl(353, 0%, 95%)", "hsl(353, 0%, 20%)")(props),
      },
    }),
  },
};
