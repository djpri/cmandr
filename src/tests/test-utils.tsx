import { ChakraProvider, theme } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import matchers from "@testing-library/jest-dom/matchers";
import { render, RenderOptions } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { rootReducer } from "redux/store";
import { expect } from "vitest";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // turns retries off
      retry: false,
      cacheTime: Infinity,
    },
  },
});

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ReduxProvider
    store={configureStore({
      reducer: rootReducer,
      preloadedState: {
        app: {
          userHasReceivedToken: true,
        },
        layout: {
          isSidebarOpen: false,
          categoriesOpen: {},
          sideBarAccordionIndex: [2, 4, 6],
        },
      },
    })}
  >
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ChakraProvider>
      </DndProvider>
    </QueryClientProvider>
  </ReduxProvider>
);

export function renderWithClient(ui: React.ReactElement) {
  const { rerender, ...result } = customRender(ui);
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) => rerender(rerenderUi),
  };
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender };
export { expect as viExpect };
