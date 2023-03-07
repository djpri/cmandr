import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";
import { Accordion } from "./components/Accordion";
import { Button } from "./components/Button";
import "@fontsource/roboto"

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  // remove outline on focus
  shadows: {
    outline:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
  },
  styles: {
    global: (props: Dict<never>) => ({
      body: {
        fontFamily: "body",
        fontSize: { base: "0.875rem", md: "1rem" },
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("gray.100", "#0f0f0f")(props),
        lineHeight: "base",
        transitionProperty: "background-color",
        transitionDuration: "0ms",
      },
      ".gridRow": {
        _hover: {
          backgroundColor: mode("whiteAlpha.600", "blackAlpha.400")(props),
        },
        _focus: {
          backgroundColor: mode("pink.600", "pink.400")(props),
        },
      },
    }),
  },
  fonts: {
    heading: "Roboto, Segoe UI",
    body: "Roboto, Segoe UI",
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "600",
      letterSpacing: "0.15em",
      lineHeight: "1.24",
      fontSize: { base: "1.75rem", md: "3.5rem" },
      transitionProperty: "background-color",
      transitionDuration: "0ms",
    },
    "heading-2": {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "900",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      fontSize: { base: "1.75rem", md: "2.75rem" },
      transitionProperty: "background-color",
      transitionDuration: "0ms",
    },
    caps: {
      textTransform: "uppercase",
      fontWeight: "900",
      fontSize: "sm",
      letterSpacing: "widest",
    },
  },
  components: {
    Button,
    Accordion,
    Input: {
      defaultProps: {
        focusBorderColor: "hsla(270, 26%, 59%, 0.5)",
      },
      baseStyle: {
        field: {
          _focus: {
            boxShadow: "outline",
          },
        },
      },
    },
    Link: {
      baseStyle: (props) => ({
        _hover: {
          color: mode("purple.500", "purple.300")(props),
        },
      }),
    },
    Popover: {
      baseStyle: {
        content: {
          rounded: "sm",
        },
      },
    },
    TabPanel: {
      baseStyle: {
        _track: {
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default theme;
