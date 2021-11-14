import * as React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/store";
import { configureStore } from "@reduxjs/toolkit";
import { mockStore } from "./redux/mockStore";
import { BrowserRouter } from "react-router-dom";

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <Provider
    store={configureStore({ reducer: rootReducer, preloadedState: mockStore })}
  >
    <ChakraProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ChakraProvider>
  </Provider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
