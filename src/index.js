import React from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "./context/AppContext";
import App from "./App";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
