import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import { Accordion } from "./components/Accordion";
import { Button } from "./components/Button";

const theme = extendTheme({
  // remove outline on focus
  initialColorMode: "dark",
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
        bg: mode("gray.100", "#131316")(props),
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
    heading: "Lato",
    body: "Lato",
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "900",
      letterSpacing: "-0.015em",
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
        focusBorderColor: "hsla(220, 26%, 59%, 0.5)",
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
