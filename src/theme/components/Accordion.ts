import { mode } from "@chakra-ui/theme-tools";
import { ComponentStyleConfig } from "@chakra-ui/react";

export const Accordion: ComponentStyleConfig = {
  defaultProps: {
    // reduceMotion: true,
  },
  baseStyle: (props) => ({
    button: {
      width: "100%",
      transitionProperty: "background-color",
      transitionDuration: "0ms",
      _hover: {
        backgroundColor: mode("whiteAlpha.600", "whiteAlpha.200")(props),
      },
      _focus: {
        boxShadow: "none",
      },
      px: 6,
    },
    panel: {
      p: "0",
    },
  }),
};
