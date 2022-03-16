import {
  AccountInfo,
  Configuration,
  EventCallbackFunction,
  EventMessage,
  EventType,
  InteractionType,
  PublicClientApplication,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { rootReducer } from "redux/store";
import { testAccount, TEST_CONFIG } from "testConstants";

const msalConfig: Configuration = TEST_CONFIG;

Object.defineProperty(global.self, "crypto", {
  value: {
    // Needed for @azure/msal-browser
    subtle: {
      digest: jest.fn(),
    },
  },
});

let pca: PublicClientApplication;
let eventCallbacks: EventCallbackFunction[];
let cachedAccounts: AccountInfo[] = [testAccount];

beforeEach(async () => {
  eventCallbacks = [];
  let eventId = 0;
  pca = new PublicClientApplication(msalConfig);
  jest.spyOn(pca, "addEventCallback").mockImplementation((callbackFn) => {
    eventCallbacks.push(callbackFn);
    eventId += 1;
    return eventId.toString();
  });
  jest.spyOn(pca, "handleRedirectPromise").mockImplementation(() => {
    const eventStart: EventMessage = {
      eventType: EventType.HANDLE_REDIRECT_START,
      interactionType: InteractionType.Redirect,
      payload: null,
      error: null,
      timestamp: 10000,
    };

    eventCallbacks.forEach((callback) => {
      callback(eventStart);
    });

    const eventEnd: EventMessage = {
      eventType: EventType.HANDLE_REDIRECT_END,
      interactionType: InteractionType.Redirect,
      payload: null,
      error: null,
      timestamp: 10000,
    };

    eventCallbacks.forEach((callback) => {
      callback(eventEnd);
    });
    return Promise.resolve(null);
  });

  jest.spyOn(pca, "getAllAccounts").mockImplementation(() => cachedAccounts);
});

afterEach(async () => {
  // cleanup on exiting
  jest.restoreAllMocks();
  jest.clearAllMocks();
  queryClient.clear();
  cachedAccounts = [];
  // await waitFor(() => Promise.resolve());
});

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
          },
        },
      })}
    >
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <MsalProvider instance={pca}>{children}</MsalProvider>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </QueryClientProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
