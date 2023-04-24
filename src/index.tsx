import { ColorModeScript, theme } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
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
import Loading from "views/Loading";
import { App } from "./App";
import { PersistQueryClientProvider, PersistedClient, Persister } from "@tanstack/react-query-persist-client";
import { get, set, del } from "idb-keyval";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

function createIDBPersister(idbValidKey: IDBValidKey = "reactQuery") {
  return {
    persistClient: async (client: PersistedClient) => {
      set(idbValidKey, client);
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey);
    },
    removeClient: async () => {
      await del(idbValidKey);
    },
  } as Persister;
}
export const IDBPersister = createIDBPersister();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <ColorModeScript />
    <DndProvider backend={HTML5Backend}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: IDBPersister }}>
        <ReduxProvider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <CustomMsalProvider instance={msalInstance}>
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              <App />
              <ReactQueryDevtools initialIsOpen={true} />
            </CustomMsalProvider>
          </PersistGate>
        </ReduxProvider>
      </PersistQueryClientProvider>
    </DndProvider>
  </StrictMode>
);
