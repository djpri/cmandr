import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ColorModeScript } from "@chakra-ui/react";
import { b2cPolicies } from "auth/policies";
import * as React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: false,
    },
  },
});

const msalConfig: Configuration = {
  auth: {
    clientId: "aa645fe5-eb96-4321-8a0c-fbb8fdba76e2",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MsalProvider instance={msalInstance}>
          <Provider store={store}>
            <App />
            <ReactQueryDevtools initialIsOpen={true} />
          </Provider>
        </MsalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
