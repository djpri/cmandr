import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/400.css";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "body",
        fontSize: { base: "0.875rem", md: "1rem" },
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("gray.50", "blue.800")(props),
        lineHeight: "base",
      },
    }),
  },
  fonts: {
    heading: "Nunito Sans",
    body: "Nunito Sans",
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      fontSize: { base: "1.75rem", md: "3.5rem" },
    },
    "heading-2": {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      fontSize: { base: "1.75rem", md: "2.75rem" },
    },
    caps: {
      textTransform: "uppercase",
      fontSize: "sm",
      letterSpacing: "widest",
      fontWeight: "bold",
    },
  },
});

export default theme;
