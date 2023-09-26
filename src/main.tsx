import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import 'boxicons';
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>
);
