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
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { testAccount, TEST_CONFIG } from "testConstants";
import { mockStore } from "./redux/mockStore";
import { rootReducer } from "./redux/store";

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

beforeEach(() => {
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

afterEach(() => {
  // cleanup on exiting
  jest.restoreAllMocks();
  jest.clearAllMocks();
  cachedAccounts = [];
});

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <Provider
    store={configureStore({ reducer: rootReducer, preloadedState: mockStore })}
  >
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <MsalProvider instance={pca}>{children}</MsalProvider>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
