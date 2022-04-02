import { Accordion } from "./components/Accordion";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import { Button } from "./components/Button";

const theme = extendTheme({
  // remove outline on focus
  shadows: {
    outline:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
  },
  styles: {
    global: (props: Dict<any>) => ({
      body: {
        fontFamily: "body",
        fontSize: { base: "0.875rem", md: "1rem" },
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("gray.100", "gray.900")(props),
        lineHeight: "base",
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
    // body: "Nunito Sans",
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "900",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      fontSize: { base: "1.75rem", md: "3.5rem" },
    },
    "heading-2": {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "900",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      fontSize: { base: "1.75rem", md: "2.75rem" },
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
        focusBorderColor: "hsla(220, 26%, 39%, 0.5)",
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: "underline",
          color: "purple.500",
        },
      },
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
