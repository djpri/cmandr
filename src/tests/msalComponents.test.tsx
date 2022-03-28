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
import { App } from "App";
import LoginButton from "components/auth/LoginButton";
import SignOutButton from "components/auth/SignOutButton";

import LoginPopover from "components/layout/NavBar/LoginPopover/LoginPopover";
import { act, fireEvent, render, screen } from "./test-utils";
import { testAccount, TEST_CONFIG } from "./msalTestConstants";

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
const cachedAccounts: AccountInfo[] = [testAccount];

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

    act(() => {
      eventCallbacks.forEach((callback) => {
        callback(eventStart);
      });
    });

    const eventEnd: EventMessage = {
      eventType: EventType.HANDLE_REDIRECT_END,
      interactionType: InteractionType.Redirect,
      payload: null,
      error: null,
      timestamp: 10000,
    };

    act(() => {
      eventCallbacks.forEach((callback) => {
        callback(eventEnd);
      });
    });

    return Promise.resolve(null);
  });

  jest.spyOn(pca, "getAllAccounts").mockImplementation(() => cachedAccounts);
});

afterEach(() => {
  // cleanup on exiting
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

// TESTS
test("SignOutButton renders without crashing", async () => {
  render(
    <MsalProvider instance={pca}>
      <SignOutButton />
    </MsalProvider>
  );
  expect(await screen.findByText(/Sign Out/i)).toBeInTheDocument();
});

test("Login button shows correct text", async () => {
  render(
    <MsalProvider instance={pca}>
      <LoginButton />
    </MsalProvider>
  );
  const linkElement = await screen.findByText(/Log In/i);
  expect(linkElement).toBeInTheDocument();
});

test("Shows display name for logged in user", async () => {
  render(
    <MsalProvider instance={pca}>
      <LoginPopover />
    </MsalProvider>
  );

  // click popover button
  const button = screen.getByRole("button");
  fireEvent.click(button);
  // then check that display name is visible
  const leftText = await screen.findByText(/Signed in as/i);
  const displayName = await screen.findByText(testAccount.name);

  expect(leftText).toBeInTheDocument();
  expect(displayName).toBeInTheDocument();
});

test("App component renders without crashing", async () => {
  render(
    <MsalProvider instance={pca}>
      <App />
    </MsalProvider>
  );
  expect(await screen.findByText("Cmandr")).toBeInTheDocument();
});
