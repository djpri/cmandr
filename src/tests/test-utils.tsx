import { ChakraProvider, theme } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { rootReducer } from "redux/store";

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
  </QueryClientProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
