import { ColorModeScript, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { msalInstance } from "auth/auth";
import CustomMsalProvider from "components/auth/AuthProvider";
import { StrictMode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "redux/store";
import { App } from "./App";
import Loading from "views/Loading";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <ColorModeScript />
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <PersistGate loading={<Loading/>} persistor={persistor}>
            <CustomMsalProvider instance={msalInstance}>
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              <App />
              <ReactQueryDevtools initialIsOpen={true} />
            </CustomMsalProvider>
          </PersistGate>
        </ReduxProvider>
      </QueryClientProvider>
    </DndProvider>
  </StrictMode>
);
