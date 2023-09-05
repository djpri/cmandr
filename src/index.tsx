import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "auth/auth";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);
