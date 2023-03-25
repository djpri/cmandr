import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "routes";
import theme from "./theme/theme";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};
