import { ChakraProvider, theme } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { rootReducer } from "redux/store";
import { expect } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // turns retries off
      retry: false,
    },
  },
});

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <DndProvider backend={HTML5Backend}>
      <Provider
        store={configureStore({
          reducer: rootReducer,
          preloadedState: {
            layout: {
              isSidebarOpen: false,
              categoriesOpen: {},
            },
          },
        })}
      >
        <ChakraProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ChakraProvider>
      </Provider>
    </DndProvider>
  </QueryClientProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

// export * from "@testing-library/react";
export { customRender as render };
export { expect as viExpect };
