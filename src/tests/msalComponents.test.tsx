import {
  AccountInfo,
  Configuration,
  EventCallbackFunction,
  EventMessage,
  EventType,
  InteractionType,
  PublicClientApplication,
} from "@azure/msal-browser";
import CustomMsalProvider from "components/auth/AuthProvider";
import LoginButton from "components/auth/LoginButton";
import SignOutButton from "components/auth/SignOutButton";

import LoginPopover from "components/layout/NavBar/LoginPopover";
import { testAccount, TEST_CONFIG } from "./msalTestConstants";
import { act, customRender, fireEvent, screen } from "./test-utils";

const msalConfig: Configuration = TEST_CONFIG;

Object.defineProperty(global.self, "crypto", {
  value: {
    // Needed for @azure/msal-browser
    subtle: {
      digest: vi.fn(),
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
  vi.spyOn(pca, "addEventCallback").mockImplementation((callbackFn) => {
    eventCallbacks.push(callbackFn);
    eventId += 1;
    return eventId.toString();
  });
  vi.spyOn(pca, "handleRedirectPromise").mockImplementation(() => {
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

  vi.spyOn(pca, "getAllAccounts").mockImplementation(() => cachedAccounts);
});

afterEach(() => {
  // cleanup on exiting
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

// TESTS
test("SignOutButton renders without crashing", async () => {
  customRender(
    <CustomMsalProvider instance={pca}>
      <SignOutButton />
    </CustomMsalProvider>
  );
  expect(await screen.findByText(/Sign Out/i)).toBeInTheDocument();
});

test("Login button shows correct text", async () => {
  customRender(
    <CustomMsalProvider instance={pca}>
      <LoginButton />
    </CustomMsalProvider>
  );
  const linkElement = await screen.findByText(/Log In/i);
  expect(linkElement).toBeInTheDocument();
});

test("Shows display name for logged in user", async () => {
  customRender(
    <CustomMsalProvider instance={pca}>
      <LoginPopover />
    </CustomMsalProvider>
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
