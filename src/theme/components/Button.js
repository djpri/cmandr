export const Button = {
  // The styles all button have in common
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
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
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
      bg: props.colorMode === "dark" ? "green.400" : "green.100",
      _hover: {
        bg: props.colorMode === "dark" ? "green.300" : "green.300",
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
      bg: props.colorMode === "dark" ? "yellow.400" : "yellow.200",
      _hover: {
        bg: props.colorMode === "dark" ? "yellow.300" : "yellow.300",
      },
    }),
    options: (props) => ({
      bg: props.colorMode === "dark" ? "teal.400" : "teal.200",
      _hover: {
        bg: props.colorMode === "dark" ? "teal.300" : "teal.300",
      },
    }),
  },
};
