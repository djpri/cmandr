import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ColorModeScript, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { msalConfig } from "auth/authConfig";
import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { App } from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);


root.render(
  <React.StrictMode>
    <ColorModeScript />
      <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={queryClient}>
          <MsalProvider instance={msalInstance}>
            <Provider store={store}>
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              <App />
              <ReactQueryDevtools initialIsOpen={true} />
            </Provider>
          </MsalProvider>
        </QueryClientProvider>
      </DndProvider>
  </React.StrictMode>,
);
