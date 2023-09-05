import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  PersistedClient,
  Persister,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import useAuth from "components/auth/useAuth";
import { del, get, set } from "idb-keyval";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "redux/store";
import { router } from "routes";
import Loading from "views/Loading";
import theme from "./theme/theme";

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
const IDBPersister = createIDBPersister();

export const App = () => {
  useAuth();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: IDBPersister }}
    >
      <DndProvider backend={HTML5Backend}>
        <ReduxProvider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <ColorModeScript initialColorMode="dark" />
            <ChakraProvider theme={theme}>
              <CSSReset />
              <RouterProvider router={router} />
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </PersistGate>
        </ReduxProvider>
      </DndProvider>
    </PersistQueryClientProvider>
  );
};
